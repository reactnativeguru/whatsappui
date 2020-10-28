//https://tech.deliveryhero.com/webrtc-on-mobile-devices/
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';

import socketIO from 'socket.io-client';
const SIGNALING_SERVER_URL = 'http://5a831e84c054.ngrok.io';

const config = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
};
export default class WebRTC {
  socket;
  pc;
  localStream;

  constructor() {
    this.socket = socketIO(SIGNALING_SERVER_URL, {
      autoConnect: false,
      jsonp: false,
      transports: ['websocket'],
    });
    // Signaling callbacks
    this.socket.on('data', this.onData);
    this.socket.on('ready', this.onReady);
  }

  connect = () => {
    this.getLocalStream();
  };

  // Signaling methods
  onData = (data) => {
    console.log('Data received: ', data);
    this.handleSignalingData(data);
  };

  onReady = () => {
    console.log('Ready');
    // Connection with signaling server is ready, and so is local stream
    this.createPeerConnection();
    this.sendOffer();
  };

  sendData = (data) => {
    this.socket.emit('data', data);
  };

  // WebRTC methods
  getLocalStream = async () => {
    const streamBuffer = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          // Provide your own width, height and frame rate here
          width: 200,
          height: 300,
          minFrameRate: 30,
        },
        facingMode: 'user',
        optional: [{sourceId}],
      },
    });

    this.localStream = streamBuffer;
    // Connect after making sure that local stream is availble
    this.socket.connect();

    // await mediaDevices
    //   .getUserMedia({
    //     audio: true,
    //     video: {facingMode: 'user'},
    //   })
    //   .then((stream) => {
    //     console.log('Stream found');
    //     this.localStream = stream;
    //     // Connect after making sure that local stream is availble
    //     this.socket.connect();
    //   })
    //   .catch((error) => {
    //     console.error('Stream not found: ', error);
    //   });
  };

  createPeerConnection = () => {
    try {
      this.pc = new RTCPeerConnection(PC_CONFIG);
      this.pc.onicecandidate = this.onIceCandidate;
      this.pc.onaddstream = this.onAddStream;
      this.pc.addStream(this.localStream);
      console.log('PeerConnection created');
    } catch (error) {
      console.error('PeerConnection failed: ', error);
    }
  };

  sendOffer = () => {
    console.log('Send offer');
    this.pc.createOffer({}).then(this.setAndSendLocalDescription, (error) => {
      console.error('Send offer failed: ', error);
    });
  };

  sendAnswer = () => {
    console.log('Send answer');
    this.pc.createAnswer().then(this.setAndSendLocalDescription, (error) => {
      console.error('Send answer failed: ', error);
    });
  };

  setAndSendLocalDescription = (sessionDescription) => {
    this.pc.setLocalDescription(sessionDescription);
    console.log('Local description set');
    this.sendData(sessionDescription);
  };

  onIceCandidate = (event) => {
    if (event.candidate) {
      console.log('ICE candidate');
      this.sendData({
        type: 'candidate',
        candidate: event.candidate,
      });
    }
  };

  onAddStream = (event) => {
    console.log('Add stream');
    this.onRemoteStreamObtained(event.stream);
  };

  handleSignalingData = (data) => {
    switch (data.type) {
      case 'offer':
        this.createPeerConnection();
        this.pc.setRemoteDescription(new RTCSessionDescription(data));
        this.sendAnswer();
        break;
      case 'answer':
        this.pc.setRemoteDescription(new RTCSessionDescription(data));
        break;
      case 'candidate':
        this.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        break;
    }
  };
}
