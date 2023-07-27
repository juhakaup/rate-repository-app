import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
// import { useEffect } from "react";

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE, {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      }
    });

  const signIn = async ({ username, password }) => {
    await authenticate({ variables: { credentials: { username, password } } });
  };

  return [signIn, result];
};

export default useSignIn;