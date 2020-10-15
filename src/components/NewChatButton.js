import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {useNavigation} from '@react-navigation/native';

const NewChatButton = (props) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Contacts');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="message-reply-text"
          size={28}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
export default NewChatButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.tint,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
