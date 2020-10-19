import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatInput = ({channelName, channelId}) => {
  const [chat, setChat] = useState('');

  const sendMessage = () => {
    if (channelId) {
      firestore()
        .collection('rooms')
        .doc(channelId)
        .collection('messages')
        .add({
          message: chat,
          timestamp: firestore.FieldValue.serverTimestamp,
          user: 'jayant',
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={` Message: ${channelName?.toLowerCase()}`}
        onChangeText={(value) => setChat(value)}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={sendMessage}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ChatInput;

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#cccccc',
    width: 300,
    height: 50,
    padding: 10,
  },
});
