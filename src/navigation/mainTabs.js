import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeStack from './HomeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatScreen from '../screens/ChatScreen';
import SafeAreaView from 'react-native-safe-area-view';
import HomeScreen from '../screens/HomeScreen';
import colors from '../theme/colors';
import ForumScreen from '../screens/ForumScreen';
import VideoScreen from '../screens/VideoScreen';
const Tab = createMaterialTopTabNavigator();

const MainTabs = () => (
  <SafeAreaView style={{flex: 1}}>
    <Tab.Navigator
      initialRouteName="ChatScreen"
      tabBarOptions={{
        activeTintColor: colors.light.background,
        style: {
          backgroundColor: colors.light.tint,
        },
        indicatorStyle: {
          backgroundColor: colors.light.background,
          height: 4,
        },
        labelStyle: {
          fontWeight: 'bold',
        },
        showIcon: true,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="ios-camera"
              size={24}
              color={colors.light.background}
            />
          ),
          tabBarLabel: () => null,
        }}
        name="Camera"
        component={HomeScreen}
      />
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Forum" component={ForumScreen} />

      <Tab.Screen name="Video" component={VideoScreen} />
    </Tab.Navigator>
  </SafeAreaView>
);

export default MainTabs;
