import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import theme from '../app/theme';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as Yup from 'yup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: theme.colors.textLight,
    
  }
});

const validate = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});




const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validate}
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