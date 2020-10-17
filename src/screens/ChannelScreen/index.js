import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ChannelScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Close</Text>
      </TouchableOpacity>
      <Text>ChannelScreen</Text>
    </View>
  );
};
export default ChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
