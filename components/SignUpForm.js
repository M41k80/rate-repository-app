import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { CREATE_USER } from '../graphql/createUser'; 
import useSignIn from '../hooks/useSignIn'; 
import theme from '../app/theme';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: theme.fontSizes.large,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius,
    padding: 8,
    marginBottom: 16,
    fontSize: theme.fontSizes.large,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textLight,
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
  },
});

const SignUpForm = () => {
  const navigation = useNavigation();
  const [createUser] = useMutation(CREATE_USER);
  const { signIn } = useSignIn();

  // Validation schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('username is required')
      .min(1, 'username must be at least 1 character')
      .max(30, 'username cannot be more than 30 characters'),
    password: Yup.string()
      .required('password is required')
      .min(5, 'password must be at least 5 characters')
      .max(50, 'password cannot be more than 50 characters'),
      passwordConfirmation: Yup.string()
      .required('password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'passwords do not match'),
  });

  const onSubmit = async (values) => {
    try {
      // Create a new user
      const { data } = await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });

      console.log('User created:', data.createUser);

      // Sign in with the newly created user
      await signIn({ username: values.username, password: values.password });

      // Redirect to the repository list
      navigation.navigate('Repositories');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <View style={styles.container}>
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            placeholder="Enter your username"
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Enter your password"
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
            placeholder="Confirm your password"
            secureTextEntry
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
    </View>
  );
};

export default SignUpForm;