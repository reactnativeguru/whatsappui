import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Message from '../../components/Message';

const ChannelChatScreen = ({navigation}) => {
  const route = useRoute();

  // sendconsole.log(route.params);
  const roomId = route.params.channel;

  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      firestore()
        .collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));

      firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setRoomMessages(snapshot.docs.map((doc) => doc.data())),
        );
    }
  }, [roomId]);

  // console.warn('roomDetails::', roomDetails);
  console.warn('roomMessages::', roomMessages);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Close</Text>
      </TouchableOpacity>
      {/* <Text>{route.params.name}</Text> */}
      <Text>{roomDetails?.name}</Text>
      {roomMessages.map((message) => (
        <Message
          message={message}
          timestamp={message.timestamp}
          user={message.user}
          userImage={message.userImage}
        />
      ))}
    </View>
  );
};
export default ChannelChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
