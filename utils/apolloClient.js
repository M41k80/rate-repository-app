import { ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from 'expo-constants';

//ip de la api

const client = new ApolloClient({
  
  uri: Constants.expoConfig.extra.apolloUri,
  
  cache: new InMemoryCache(), 
});

export default client; 
