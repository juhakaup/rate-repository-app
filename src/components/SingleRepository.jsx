import useRepository from "../hooks/useRepository";
import { useParams } from "react-router-native";
import { FlatList } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import Text from "./Text";


const SingleRepository = () => {
  const { repositoryId } = useParams();

  const { loading, error, repository, fetchMore } = useRepository({ repositoryId, first: 3 });

  if (loading) {
    return (<Text>Loading...</Text>)
  }

  if (error) {
    return (console.log(error))
  }

  const onEndReached = () => {
    fetchMore();
  }
  
  return (
    <FlatList
    data={repository.reviews.edges}
    renderItem={({ item }) => <ReviewItem item={item} />}
    keyExtractor={({ id }) => id}
    ItemSeparatorComponent={ItemSeparator}
    ListHeaderComponent={() => <RepositoryItem item={repository} singleItem={true} />}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.1}
    />
  )
}

export default SingleRepository;