import { StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    padding: 15,
})

const TextSubheading = ({ text }) => {
    return <Text style={styles} color={'light'} fontWeight={'bold'} fontSize={'subheading'}> {text} </Text>;
};

export default TextSubheading;