import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Messages from '../../data/messages';
import ChatMessage from '../../components/ChatMessage';
import BG from '../../assets/images/BG.png';
import ChatInputBox from '../../components/ChatInputBox';

const ChatRoomScreen = (props) => {
  const route = useRoute();
  console.log(route.params);
  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
      <View style={styles.container}>
        <FlatList
          data={Messages.messages}
          renderItem={({item}) => <ChatMessage message={item} />}
          inverted
        />
      </View>
      <ChatInputBox />
    </ImageBackground>
  );
};
export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
