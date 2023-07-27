import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {

  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return { 
    repositories: result.data ? result.data.repositories : undefined,
    loading: result.loading, 
    refetch: result.refetch
  };
};

export default useRepositories;
