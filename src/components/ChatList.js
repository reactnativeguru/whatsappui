import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ChatItem = ({chatRoom}) => {
  const navigation = useNavigation();
  const user = chatRoom.users[1];

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
      name: user.name,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{uri: user.imageUri}} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {chatRoom.lastMessage.content}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>
          {moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey',
  },
});
