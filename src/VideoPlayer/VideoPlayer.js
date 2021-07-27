import React from 'react';
import {View} from 'react-native';
import YouTube from 'react-native-youtube';

export default function VideoPlayer() {
  return (
    <View>
      <YouTube
        videoId="O433Arp-l0E" // The YouTube video ID
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        onReady={e => this.setState({isReady: true})}
        onChangeState={e => this.setState({status: e.state})}
        onChangeQuality={e => this.setState({quality: e.quality})}
        onError={e => this.setState({error: e.error})}
        style={{alignSelf: 'stretch', height: 300}}
      />
    </View>
  );
}
