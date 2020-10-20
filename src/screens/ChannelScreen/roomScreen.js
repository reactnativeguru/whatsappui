import React, {useState} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Ionicons name="ios-send-outline" size={24} color="#6646ee" />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <MaterialCommunityIcons
          name="chevron-double-down"
          size={24}
          color="#6646ee"
        />
      </View>
    );
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
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
          user={{_id: 1, name: 'John'}}
          messages={messages}
          renderBubble={renderBubble}
          placeholder="Type your message here..."
          showUserAvatar
          alwaysShowSend
          scrollToBottom
          renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          renderLoading={renderLoading}
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
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});
