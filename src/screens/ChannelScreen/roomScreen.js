import React, {useState} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const RoomScreen = ({navigation}) => {
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: 'Henlo!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test Dser',
      },
    },
  ]);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  const renderBubble = (props) => {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Close</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <GiftedChat
          onSend={(newMessage) => handleSend(newMessage)}
          user={{_id: 1}}
          messages={messages}
          renderBubble={renderBubble}
        />
      </View>
    </View>
  );
};
export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
