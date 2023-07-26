import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {

  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  return { repositories: result.data.repositories, loading: result.loading, refetch: result.refetch };
};

export default useRepositories;
