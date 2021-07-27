import React, {useEffect, useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
// https://github.com/zo0r/react-native-push-notification/issues/1395#issuecomment-623787394
import PushNotification, {Importance} from 'react-native-push-notification';
import {
  changeNotificationSetting,
  checkNotificationPermission,
} from 'react-native-check-notification-permission';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: '123456789', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    visibility: 'public',
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const PushNotificationDemo = () => {
  const [
    isNotificationPermissionsGranted,
    setIsNotificationPermissionsGranted,
  ] = useState(false);

  const checkPermissions = async () => {
    const isGranted = await checkNotificationPermission();
    console.log('isGranted', isGranted);
    setIsNotificationPermissionsGranted(isGranted);
  };

  // Configure push notification
  useEffect(() => {
    checkPermissions();
  }, []);

  // create a channel https://stackoverflow.com/a/66342071
  useEffect(() => {}, []);

  // handleShowNotification: function which will show notification
  const handleShowNotification = notificationData => {
    // PushNotification.localNotification({
    //   /* Android Only Properties */
    //   channelId: '123456789', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    //   title: 'My Notification Title', // (optional)
    //   message: 'My Notification Message', // (required)
    //   soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //   // ticker: "My Notification Ticker", // (optional)
    //   // showWhen: true, // (optional) default: true
    //   // autoCancel: true, // (optional) default: true
    //   // largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    //   // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //   // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    //   // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    //   // subText: "This is a subText", // (optional) default: none
    //   // bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //   // bigLargeIcon: "ic_launcher", // (optional) default: undefined
    //   // bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
    //   // color: "red", // (optional) default: system default
    //   // vibrate: true, // (optional) default: true
    //   // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //   // tag: "some_tag", // (optional) add tag to message
    //   // group: "group", // (optional) add group to message
    //   // groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    //   // ongoing: false, // (optional) set whether this is an "ongoing" notification
    //   // priority: "high", // (optional) set notification priority, default: high
    //   // visibility: "private", // (optional) set notification visibility, default: private
    //   // ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    //   // shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    //   // onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
    //   // when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    //   // usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    //   // timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    //   // messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
    //   // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    //   // invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    //   // /* iOS only properties */
    //   // category: "", // (optional) default: empty string
    //   // subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
    //   // /* iOS and Android properties */
    //   // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //   // userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    //   // playSound: false, // (optional) default: true
    // });

    PushNotification.localNotification({
      //ios and android properties
      title: 'Face2Face: Beacon Timer Expired',
      message: 'Perhaps set your beacon timer for another hour?',
      // largeIcon: 'ic_notification', // (optional) default: "ic_launcher". Use "" for no large icon.
      playSound: true,
      //android only properties
      channelId: '123456789',
      autoCancel: true,
      smallIcon: 'ic_notification',
      bigText: 'Face2Face: Beacon Timer Expired',
      subText: 'Perhaps set your beacon timer for another hour?',
      vibrate: true,
      priority: 'high',
      importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
      visibility: 'public',
      bigPictureUrl:
        'data:image/png;base64,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', // (optional) default: undefined
      //ios only properties...is there any?
    });
  };

  const handleNotificationAllow = async () => {
    // await PushNotification.requestPermissions(['badge', 'sound']);
    await PushNotification.checkPermissions(d => console.log('data', d));
  };

  const goToNotificationSettings = async () => {
    changeNotificationSetting();
  };

  return (
    <View>
      <Text>React native permissions : {isNotificationPermissionsGranted}</Text>
      <Button
        onPress={handleShowNotification}
        title="Press here to show notification"
      />
      <Button onPress={goToNotificationSettings} title="Notification setting" />
      <Button onPress={handleNotificationAllow} title="Notification grant" />
    </View>
  );
};

export default PushNotificationDemo;
