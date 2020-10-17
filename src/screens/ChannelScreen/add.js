import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddChannelScreen = ({navigation}) => {
  const [channelName, setChannelName] = useState(null);
  const addChannelScreen = () => {
    if (channelName) {
      firestore()
        .collection('rooms')
        .add({name: channelName})
        .then(() => {
          console.warn('added:: ', channelName);
          navigation.goBack();
        })
        .catch((err) => {
          console.warn(err.message);
        });
      // alert(channelName);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Close</Text>
      </TouchableOpacity>
      <Text>AddChannelScreen</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setChannelName(value)}
      />
      <TouchableOpacity onPress={addChannelScreen}>
        <Text>Add Channel</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: 300,
  },
});
