import { ApolloClient, InMemoryCache} from '@apollo/client';

//ip de la api

const client = new ApolloClient({
  
  uri: 'http://192.168.0.179:4000/graphql', 
  
  cache: new InMemoryCache(), 
});

export default client; 
