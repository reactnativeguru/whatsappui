import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../theme/colors';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  displayIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
  },
});

export default HomeStack;
