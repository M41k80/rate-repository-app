import { useQuery } from '@apollo/client'; 
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading: true };
  if (error) return { error };
  console.log(data); // to see if the data is already loaded

  return { repositories: data?.repositories, loading, error, refetch };
};

export default useRepositories;
