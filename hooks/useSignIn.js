<<<<<<< HEAD
import { useMutation, gql } from '@apollo/client';
=======
import { useMutation, gql, useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
>>>>>>> part3

const Authenticate = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
        user{
            id
            username
        }
        accessToken
        expiresAt
    }
}
`;

const useSignIn = () => {
    const [mutate, result] = useMutation(Authenticate);
<<<<<<< HEAD

    const signIn = async ({ username, password }) => {
        try {
        const response = await mutate({ 
            variables: { credentials: { username, password } },
         });
         console.log('full response Data:', response);

         if (response.errors) {
            console.error('Errors:', response.errors);
            return null;
         }
         if (response.data && response.data.authenticate) {
            const {accessToken, expiresAt, user} = response.data.authenticate;
            console.log('accessToken:', accessToken);
            console.log('expiresAt:', expiresAt);
            console.log('user:', user);
            return response.data;
         }

         console.error('No data returned from signIn');
         return null;
        } catch (error) {
            console.error('Error during sign in:', error);
            return null;
        }
    };

        return [signIn, result];
    };

export default useSignIn;
=======
    const authStorage = useContext(AuthStorageContext) //instance of AuthStorage
    const apolloClient = useApolloClient();
    const navigation = useNavigation();


    const signIn = async ({ username, password }) => {
        try {
          const { data } = await mutate({
            variables: { credentials: { username, password } },
          });
    
          if (data && data.authenticate) {
            const { accessToken } = data.authenticate;
    
            // save the access token
            await authStorage.setAccessToken(accessToken);
    
            // Reset the Apollo Client store
            await apolloClient.resetStore();
    
            // Navigate to the Repositories screen
            navigation.navigate('Repositories');
          }
    
          return data;
        } catch (error) {
          console.error('Error during sign in:', error);
          return null;
        }
      };
    
      return [signIn, result];
    };

export default useSignIn;
>>>>>>> part3
