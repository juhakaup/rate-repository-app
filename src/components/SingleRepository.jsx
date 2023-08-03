import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import Text from "./Text";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";


const SingleRepository = () => {
  const { repositoryId } = useParams();

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId },
  });

  if (loading) {
    return (<Text>Loading...</Text>)
  }

  if (error) {
    return (console.log(error))
  }
  
  return (
    <RepositoryItem item={data.repository} singleItem={true} />
  )
}

export default SingleRepository;