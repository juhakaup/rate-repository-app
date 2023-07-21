import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants'
import theme from '../theme';
import TextSubheading from './TextSubheading';


const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.dark,
  },
  tab: {
    padding: 20,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('pressed')}>
        <TextSubheading style={styles.tab}>Repositories</TextSubheading>
      </Pressable>

    </View>
  )
};

export default AppBar;