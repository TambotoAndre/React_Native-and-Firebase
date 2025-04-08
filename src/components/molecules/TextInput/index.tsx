import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import React from 'react';

const TextInput = ({placeholder}) => {
  return (
    <View>
      <Input style={styles.textInput} placeholder={placeholder} />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#F8FCFA',
    color: '#16423C',
    borderColor: '#16423C',
    opacity: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 32,
    marginRight: 33,
    paddingLeft: 18.86,
    paddingVertical: 11,
    fontSize: 16,
  },
});
