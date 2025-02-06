import { useQuery } from '@apollo/client'; 
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading: true };
  if (error) return { error };
  console.log(data); // to see if the data is already loaded

  return { repositories: data.repositories };
};

export default useRepositories;
