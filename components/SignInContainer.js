import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { Formik } from 'formik';

const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            placeholder="Username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            testID="usernameField"
          />
          <TextInput
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            testID="passwordField"
          />
          <Button
            title="Sign In"
            onPress={handleSubmit}
            testID="submitButton"
          />
        </View>
      )}
    </Formik>
  );
};

export default SignInContainer;