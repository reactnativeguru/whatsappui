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
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthFirebaseContext} from '../../context/AuthFirebaseContext';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

const ForumScreen = (props) => {
  const route = useRoute();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthFirebaseContext);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('rooms')
      // add this
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const channels = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            // add this
            latestMessage: {
              text: '',
            },
            // ---
            ...documentSnapshot.data(),
          };
        });

        setChannels(channels);

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);
  const currentUser = user.toJSON();
  console.log(channels);

  return (
    <View style={styles.container}>
      <Text>ForumScreen</Text>
    </View>
  );
};
export default ForumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
