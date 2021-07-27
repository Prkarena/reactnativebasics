import React from 'react';
import {Text, View} from 'react-native';
import YouTube from 'react-native-youtube';

export default function VideoPlayer() {
  return (
    <View>
      <Text>Vide player</Text>
      <YouTube
        videoId="O433Arp-l0E" // The YouTube video ID
        // playlistId="PLOrIp4IaHcFOzmh14dFsMq0eZQjz4nzza"
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        // onReady={e => this.setState({isReady: true})}
        // onChangeState={e => this.setState({status: e.state})}
        // onChangeQuality={e => this.setState({quality: e.quality})}
        // onError={e => this.setState({error: e.error})}
        style={{alignSelf: 'stretch', height: 250}}
        apiKey="-------your api key------"
      />
    </View>
  );
}
