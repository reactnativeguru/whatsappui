import React from 'react';
import {View, Dimensions, StyleSheet, TextInput} from 'react-native';
const {width, height} = Dimensions.get('screen');

const FormInput = ({labelName, ...rest}) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={labelName}
        style={styles.textInput}
        numberOfLines={1}
        {...rest}
      />
    </View>
  );
};
export default FormInput;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    backgroundColor: 'rgba(255, 255, 255,255)',
    padding: 10,
  },
});
