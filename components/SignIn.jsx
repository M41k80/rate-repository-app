import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import theme from '../app/theme';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});


const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'The UserName is Required';
  }
  if (!values.password) {
    errors.password = 'The Password is Required';
  }else if (values.password.length < 8) {
    errors.password = 'The Password must be at least 8 characters';
  }
  return errors;
};

const onSubmit = (values) => {
  console.log(values);
};


const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={validate}
      onSubmit={onSubmit}
      >
      {({handleSubmit}) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" style={styles.input} />
          <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry />
          <Button title="Sign In" onPress={handleSubmit} />
        </View>
      )}

      </Formik>
    
  );
};

export default SignIn; 