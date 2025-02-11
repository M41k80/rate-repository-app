import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SignInContainer from '../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // Mock function for onSubmit
      const onSubmit = jest.fn();

      // Render the SignInContainer component
      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

      // Fill the form fields
      await act(async () => {
        fireEvent.changeText(getByTestId('usernameField'), 'testuser');
        fireEvent.changeText(getByTestId('passwordField'), 'testpassword');
      });

      // Submit the form
      await act(async () => {
        fireEvent.press(getByTestId('submitButton'));
      });

      // Wait for the onSubmit function to be called
      await waitFor(() => {
        // Expect the onSubmit function to have been called once
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Expect the onSubmit function to have been called with the correct form values
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: 'testuser',
            password: 'testpassword',
          }),
          expect.anything() // Ignore the second argument (Formik helpers)
        );
      });
    });
  });
});