import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthFirebaseContext} from '../../context/AuthFirebaseContext';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthFirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>

      <FormInput
        placeholder="Email"
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormInput
        placeholder="Password"
        labelName="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormButton title="Login" onPress={() => login(email, password)} />
      <FormButton
        title="New user? Join here"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});
