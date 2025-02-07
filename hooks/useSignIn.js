import { useMutation, gql } from '@apollo/client';

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
