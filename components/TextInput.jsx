import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../app/theme';

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    errorInput: {
        borderColor: '#d73a4a',
    },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.errorInput, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;