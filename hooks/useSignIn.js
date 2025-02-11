import { useMutation, gql, useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

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