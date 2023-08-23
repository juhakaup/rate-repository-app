import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useDeleteReview = () => {
    const [removeReview, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (deleteReviewId) => {
        await removeReview( { variables: { deleteReviewId } } )
    };

    return [deleteReview, result];
}

export default useDeleteReview;