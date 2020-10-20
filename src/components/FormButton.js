import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const FormButton = ({title, modeValue, ...rest}) => (
  <View style={styles.container}>
    <TouchableOpacity {...rest} style={styles.button}>
      <View style={{flex: 1}}>
        <Text style={styles.labelText}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);
export default FormButton;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 122, 255,123)',
    width: width / 2,
    height: 30,
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
  labelText: {
    alignSelf: 'center',
    justifyContent: 'center',

    fontSize: 15,
    // lineHeight: 30,
  },
});
