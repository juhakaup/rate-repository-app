import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {

  const [newReview, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ review }) => {
    await newReview({ variables: { review }})
  }

  return [createReview, result]
};

export default useCreateReview;
