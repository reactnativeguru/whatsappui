import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ChatItem from '../../components/ChatList';
import NewChatButton from '../../components/NewChatButton';
import ChatData from '../../data/chats';

const ChatScreen = (props) => {
  const chatRoom = {
    lastMessage: 'Hello Deftness',
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={ChatData}
        renderItem={({item}) => <ChatItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      <NewChatButton />
    </View>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
