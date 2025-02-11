import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      // delete the access token from storage
      await authStorage.removeAccessToken();

      // Reset the Apollo Client store
      await apolloClient.resetStore();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return signOut;
};

export default useSignOut;