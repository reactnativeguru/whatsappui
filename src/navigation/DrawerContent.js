import React, {useState, useEffect} from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const FooterLinks = () => {
  return (
    <View style={styles.footerLinks}>
      <Text>Link 1</Text>
      <Text>Link 2</Text>
      <Text>Link 3</Text>
      <Text>Sign Out</Text>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getChannels = () => {
    const unsubscribe = firestore()
      .collection('rooms')
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          })),
        ),
      );
  };

  useEffect(() => {
    //   getChannels();
    const unsubscribe = firestore()
      .collection('rooms')
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          })),
        ),
      );
    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  // console.warn(channels);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}

      <View style={styles.container}>
        <View style={styles.profileContainer}>{/* <ProfileImage /> */}</View>

        <View style={styles.routes}>
          <DrawerItemList {...props} />
          <View style={styles.channels}>
            <Text style={styles.channelTitle}>Channels</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddChannel')}>
              <Text style={styles.channelTitle}>Add Channel</Text>
            </TouchableOpacity>
            {channels.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                onPress={() =>
                  navigation.navigate('ChannelChat', {
                    channel: channel.id,
                    name: channel.name,
                  })
                }>
                <Text># {channel.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.extraLinks}>
          <FooterLinks />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
    //  flexDirection: 'column',
  },

  profileContainer: {flex: 1},

  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routes: {
    flex: 4,
  },
  extraLinks: {
    flex: 1,
  },
  footerLinks: {
    padding: 10,
  },
  channels: {
    padding: 15,
  },
  channelTitle: {
    fontSize: 16,
  },
});
