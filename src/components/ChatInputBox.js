import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

const ChatInputBox = (props) => {
  const [message, setMessage] = useState('');
  const onMicrophonePress = () => {
    console.warn('Microphone');
  };

  const onSendPress = () => {
    console.warn(`Sending: ${message}`);

    // send the message to the backend

    setMessage('');
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Ionicons name="ios-person" size={24} color="grey" />
        <TextInput
          placeholder={'Type a message'}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Ionicons name="ios-list" size={24} color="grey" style={styles.icon} />
        {!message && (
          <Ionicons
            name="ios-camera"
            size={24}
            color="grey"
            style={styles.icon}
          />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={28} color="white" />
          ) : (
            <MaterialCommunityIcons name="send" size={28} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ChatInputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: colors.light.tint,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
