import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {AuthFirebaseContext} from '../../context/AuthFirebaseContext';
import FormButton from '../../components/FormButton';
import useStatusBar from '../../utils/useStatusBar';
const THEME_COLOR = '#285E29';

const HomeScreen = (props) => {
  const {user, logout} = useContext(AuthFirebaseContext);
  // const styleTypes = ['default', 'dark-content', 'light-content'];

  // const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);

  // const changeVisibilityStatusBar = () => {
  //   setVisibleStatusBar(!visibleStatusBar);
  // };

  // const changeStyleStatusBar = () => {
  //   const styleId = styleTypes.indexOf(styleStatusBar) + 1;

  //   if (styleId === styleTypes.length) {
  //     return setStyleStatusBar(styleTypes[0]);
  //   }
  //   return setStyleStatusBar(styleTypes[styleId]);
  // };

  useStatusBar('light-content');

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Text>{user?.uid}</Text>

      <FormButton title="Logout" onPress={() => logout()} />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME_COLOR,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});
