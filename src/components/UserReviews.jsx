import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import { ItemSeparator } from "./RepositoryList";
import Text from "./Text";

const UserReviews = () => {
    const { data, error, loading } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
        variables: { "includeReviews": true }
    });

    if (error) {
        return (console.log(error))
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    return(
        <FlatList
        data={data.me.reviews.edges}
        renderItem={({ item }) => <ReviewItem item={item} userView={true} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        />
    )
}

export default UserReviews;