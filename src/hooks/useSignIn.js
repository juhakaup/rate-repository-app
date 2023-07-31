import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useAuthStorage } from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authenticate, result] = useMutation(AUTHENTICATE, {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      }
    });

  const signIn = async ({ username, password }) => {
    await authenticate({ variables: { credentials: { username, password } } })
      .then(async (data) => {
        await authStorage.setAccessToken(data.data.authenticate.accessToken)
      })
      
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;