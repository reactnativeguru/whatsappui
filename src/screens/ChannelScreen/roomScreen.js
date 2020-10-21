import React, {useState, useContext, useEffect} from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthFirebaseContext} from '../../context/AuthFirebaseContext';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

const RoomScreen = ({navigation, route}) => {
  // const route = useRoute();
  const {channel} = route.params;
  console.warn('params:', channel);

  const {user} = useContext(AuthFirebaseContext);
  const currentUser = user.toJSON();
  console.log(currentUser);

  const [messages, setMessages] = useState([
    // /**
    //  * Mock message data
    //  */
    // // example of system message
    // {
    //   _id: 0,
    //   text: 'New room created.',
    //   createdAt: new Date().getTime(),
    //   system: true,
    // },
    // // example of chat message
    // {
    //   _id: 1,
    //   text: 'Henlo!',
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: 2,
    //     name: 'Test Dser',
    //   },
    // },
  ]);

  // helper method that is sends a message
  const handleSend = async (messages) => {
    // setMessages(GiftedChat.append(messages, newMessage));
    const text = messages[0].text;

    firestore()
      .collection('rooms')
      .doc(channel)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });

    await firestore()
      .collection('rooms')
      .doc(channel)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
        //In Firestore, when set is used with merge, it update fields in a document or create that document if it does not exists. If you use set here without merge, it will overwrite the whole document.
      );
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  };

  useEffect(() => {
    const messagesListener = firestore()
      .collection('rooms')
      .doc(channel)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

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
          onSend={handleSend}
          user={{_id: currentUser.uid}}
          messages={messages}
          renderBubble={renderBubble}
          placeholder="Type your message here..."
          showUserAvatar
          alwaysShowSend
          scrollToBottom
          renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          renderLoading={renderLoading}
          renderSystemMessage={renderSystemMessage}
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
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  systemMessageWrapper: {
    backgroundColor: '#cccccc',
  },
});
