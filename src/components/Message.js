import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Message = ({message, timestamp, user, userImage}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: userImage}} />
      <Text>{message}</Text>
      <Text>{new Date(timestamp?.toDate()).toUTCString()}</Text>
      <Text>Message</Text>
    </View>
  );
};
export default Message;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
});
