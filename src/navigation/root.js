import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../theme/colors';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './HomeStack';
import MainTabs from './mainTabs';
import ChatRoomScreen from '../screens/ChatRoomScreen';

const Stack = createStackNavigator();

const RootStack = () => (
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

const styles = StyleSheet.create({
  displayIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
  },
});

export default RootStack;
