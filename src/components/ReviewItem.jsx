import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

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
  }
});

const readableDate = (dateData) => {
  const date = new Date(dateData);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return (`${day}.${month}.${date.getFullYear()}`)
}

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.score}>{item.node.rating}</Text>
      </View>
      <View style={styles.review}>
        <Text style={styles.textUsername} fontWeight={'bold'}>{item.node.user.username}</Text>
        <Text style={styles.textDate}>{readableDate(item.node.createdAt)}</Text>
        <Text>{item.node.text}</Text>
      </View>
    </View>
  )
};

export default ReviewItem;