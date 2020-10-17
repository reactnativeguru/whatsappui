import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SignUpScreen = (props) => (
  <View style={styles.container}>
    <Text>SignUpScreen</Text>
  </View>
);
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
