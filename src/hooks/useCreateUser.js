import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
    const [newUser, result] = useMutation(CREATE_USER);

    const createUser = async ( user ) => {
        await newUser({ variables: { user } });
    };

    return [createUser, result];
};

export default useCreateUser;