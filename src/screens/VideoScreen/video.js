import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import WebRTC from './webrtc';
export default class WebRTCMobile extends React.Component {
  state = {
    remoteStreamURL: null,
  };

  onConnect = () => {
    this.webrtc = new WebRTC();
    this.webrtc.onRemoteStreamObtained = (stream) => {
      this.setState({remoteStreamURL: stream.toURL()});
    };
    this.webrtc.connect();
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <RTCView
          streamURL={this.state.remoteStreamURL}
          style={{width: 300, height: 300, alignSelf: 'center'}}
        /> */}
        <RTCView streamURL={this.state.remoteStreamURL} style={styles.viewer} />

        <Button onPress={this.onConnect} title="Connect" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewer: {
    alignSelf: 'center',
    display: 'flex',
    backgroundColor: '#45d',
    width: 300,
    height: 300,
  },
});
