import React from 'react';
import { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Button } from 'react-native';
import theme from '../app/theme';
import { Formik }  from 'formik';
import FormikTextInput from './FormikTextInput';
import * as Yup from 'yup';
import useSignIn from '../hooks/useSignIn';

import AuthStorageContext from '../contexts/AuthStorageContext';


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
  const [signIn] = useSignIn();

  const authStorage = useContext(AuthStorageContext);
  const  navigation  = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await authStorage.getAccessToken();
      if (accessToken) {
        console.log('accessToken:', accessToken);
      }
    };
    checkToken();
  }, []);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data) {
        console.log('data from signIn', data);

        await authStorage.setAccessToken(data.authenticate.accessToken);
        console.log('accessToken:', data.authenticate.accessToken);
        navigation.navigate('Repositories'); 

      } else {
        console.log('No data from signIn');
      }
      // console.log(data);
    } catch (error) {
      console.error('Error during sign in:', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => {
          console.error('GraphQL error message:', message);
        });
      }
      if (error.networkError) {
        console.error('Network error:', error.networkError);
      }
    }
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