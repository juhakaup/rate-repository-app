import { View, StyleSheet, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Pressable } from "react-native";
import * as Linking from 'expo-linking';
import useDeleteReview from "../hooks/useDeleteReview";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  score: {
    paddingTop:14,
    margin: 10,
    fontSize: 20,
    color: theme.colors.primary,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width:56,
    height:56,
    borderRadius: '27',
    textAlign: 'center',
  },
  review: {
    flexDirection: 'column',
    padding: 10,
    flex: 1
  },
  textUsername: {
    paddingBottom: 5,
  },
  textDate: {
    color: theme.colors.gray,
    paddingBottom: 5
  },
  button: {
    padding: 15, 
    borderRadius:5,  
    marginLeft:15,
    marginRight:15,
    marginBottom:15,
    alignItems: 'center',
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: "red"
  }
});

const readableDate = (dateData) => {
  const date = new Date(dateData);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return (`${day}.${month}.${date.getFullYear()}`)
}

const ReviewItem = ({ item, userView }) => {
  const openLink = (url) => {
    Linking.openURL(url)
  }

  const [deleteReview] = useDeleteReview();
  const { refetch } = useQuery(GET_CURRENT_USER, { variables: { "includeReviews": true } });
  
  const onDelete = (deleteReviewId) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => void 0,
        style: 'cancel',
      },
      {
        text: 'Delete', 
        onPress: async () => {
          console.log('Delete Pressed');
          try {
            await deleteReview(deleteReviewId);
            refetch();
          } catch (error) {
            console.log(error);
          }
        }
      },
    ]);
  }

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.score}>{item.node.rating}</Text>
        </View>
        <View style={styles.review}>
          <Text style={styles.textUsername} fontWeight={'bold'}> 
            {
              userView 
                ? item.node.repository.fullName 
                : item.node.user.username
            }
          </Text>
          <Text style={styles.textDate}>{readableDate(item.node.createdAt)}</Text>
          <Text>{item.node.text}</Text>
        </View>
      </View>
      {
        userView ?
        <View style={{ flexDirection: "row", justifyContent: "center"}}>
          <Pressable style={ [styles.button, styles.githubButton] } onPress={()=> openLink(item.node.repository.url)}>
            <Text fontWeight={'bold'} style={{ color: 'white' }} >Open in GitHub</Text>
          </Pressable>
          <Pressable style={ [styles.button, styles.deleteButton] } onPress={()=> onDelete(item.node.id)}>
            <Text fontWeight={'bold'} style={{ color: 'white' }} >Delete review</Text>
          </Pressable>
        </View>
        : null
      }
    </View>
  )
};

export default ReviewItem;