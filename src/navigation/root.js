import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../theme/colors';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useIsDrawerOpen} from '@react-navigation/drawer';

import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './HomeStack';
import MainTabs from './mainTabs';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import CustomDrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const RootStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.light.tint,
          shadowOpacity: 0.1, // ios
          elevation: 0, // android
        },
        headerTintColor: colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        options={{
          title: 'CovidApp',
          headerLeft: () => (
            <View style={{with: '100%', marginLeft: 10, marginRight: 50}}>
              <Ionicons
                name="ios-menu"
                size={24}
                color="#fff"
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={styles.displayIconRow}>
              <Ionicons name="ios-search-circle" size={24} color="#fff" />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="#fff"
              />
            </View>
          ),
        }}
        name="Root"
        component={MainTabs}
      />
      <Stack.Screen
        options={
          (({route}) => ({title: route.params.name}),
          {
            headerRight: () => (
              <View>
                <Ionicons
                  name="ios-camera"
                  size={24}
                  color={colors.light.background}
                  style={{marginRight: 20}}
                />
              </View>
            ),
          })
        }
        name="ChatRoom"
        component={ChatRoomScreen}
      />
    </Stack.Navigator>
  );
};
const RootDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerStyle={{
      backgroundColor: '#fff',
      width: 300,
    }}>
    <Drawer.Screen name="Home" component={RootStack} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  displayIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
  },
});

export default RootDrawer;
