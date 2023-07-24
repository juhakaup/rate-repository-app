import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants'
import theme from '../theme';
import TextSubheading from './TextSubheading';


const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.dark,
      flexDirection: 'row'
  },
  tab: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 15,
    paddingRight: 10,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <TextSubheading style={styles.tab}>Repositories</TextSubheading>
        </Link>
        <Link to="/signin">
          <TextSubheading style={styles.tab}>Sign In</TextSubheading>
        </Link>
      </ScrollView>
    </View>
  )
};

export default AppBar;