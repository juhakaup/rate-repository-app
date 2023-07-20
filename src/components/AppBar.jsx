import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants'
import Text from './Text';
import theme from '../theme';
import TextSubheading from './TextSubheading';


const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.dark,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('pressed')}>
        <TextSubheading text={'Repositories'}/>
      </Pressable>

    </View>
  )
};

export default AppBar;