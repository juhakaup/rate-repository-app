import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants'
import theme from '../theme';
import TextSubheading from './TextSubheading';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useAuthStorage } from "../hooks/useAuthStorage";
import { useApolloClient } from '@apollo/client';
import { useNavigate } from "react-router-dom";

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
  const authStore = useAuthStorage();
  const apolloClient = useApolloClient();
  const me = useQuery(ME);
  const currentUser = me.data?.me;
  const navigate = useNavigate();

  const logout = async () => {
    await authStore.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>

        <Link to="/">
          <TextSubheading style={styles.tab}>Repositories</TextSubheading>
        </Link>
        
        {currentUser ?
          <>
            <Link to="/review">
              <TextSubheading style={styles.tab}>Create a review</TextSubheading>
            </Link>
            <TouchableOpacity onPress={logout}>
              <TextSubheading style={styles.tab}>Logout</TextSubheading>
            </TouchableOpacity>
          </>
        : <>
          <Link to="/signin"><TextSubheading style={styles.tab}>Sign in</TextSubheading></Link>
          <Link to="/signup"><TextSubheading style={styles.tab}>Sign up</TextSubheading></Link>
          </>
        }
      </ScrollView>
    </View>
  )
};

export default AppBar;