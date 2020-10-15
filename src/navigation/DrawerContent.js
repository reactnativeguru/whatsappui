import React, {useState, useEffect} from 'react';
import {useWindowDimensions, View, Text, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';

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

  const getChannels = () => {
    firestore()
      .collection('rooms')
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
          })),
        ),
      );
  };

  useEffect(() => {
    getChannels();
  }, []);

  console.warn(channels);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}

      <View style={styles.container}>
        <View style={styles.profileContainer}>{/* <ProfileImage /> */}</View>
        <View style={styles.routes}>
          <DrawerItemList {...props} />
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
    flexDirection: 'column',
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
});
