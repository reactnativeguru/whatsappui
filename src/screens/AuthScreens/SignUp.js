import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthFirebaseContext} from '../../context/AuthFirebaseContext';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {register} = useContext(AuthFirebaseContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Register to chat</Text>
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormInput
        labelName="Password"
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormButton
        title="Signup"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => register(email, password)}
      />
      {/* <IconButton
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#6646ee"
        onPress={() => navigation.navigate('Login')}
      /> */}
    </View>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});
