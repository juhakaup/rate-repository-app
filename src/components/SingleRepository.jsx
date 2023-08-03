import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import Text from "./Text";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import { ItemSeparator } from "./RepositoryList";


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
    //<RepositoryItem item={data.repository} singleItem={true} />
    <FlatList
    data={data.repository.reviews.edges}
    renderItem={({ item }) => <ReviewItem item={item} />}
    keyExtractor={({ id }) => id}
    ItemSeparatorComponent={ItemSeparator}
    ListHeaderComponent={() => <RepositoryItem item={data.repository} singleItem={true} />}
    />
  )
}

export default SingleRepository;