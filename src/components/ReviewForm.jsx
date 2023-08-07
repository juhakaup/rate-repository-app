import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-dom";
import useCreateReview from "../hooks/useCreateReview";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: null,
  text: ""
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 4,
    margin: 7,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 7,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.textLight,
  },
  disabledButton: {
    backgroundColor: theme.colors.gray,
    padding: 10,
    margin: 7,
    borderRadius: 4,
  }
});

const SignInForm = ({ onSubmit, isValid }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownerName"
        autoCapitalize="none"
        placeholder="Repository owner name"
        style={styles.textInput}
      />
      <FormikTextInput
        name="repositoryName"
        autoCapitalize="none"
        placeholder="Repository name"
        style={styles.textInput}
      />
      <FormikTextInput
        name="rating"
        type={"number"}
        autoCapitalize="none"
        placeholder="Rating between 0 and 100"
        style={styles.textInput}
      />
      <FormikTextInput
        name="text"
        autoCapitalize="none"
        placeholder="Review"
        style={styles.textInput}
        multiline
      />
      {isValid ?
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text fontWeight={"bold"} style={styles.buttonText}>
            Create a review
          </Text>
        </Pressable>
        :
        <View style={styles.disabledButton}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
            Create a review
          </Text>
        </View>
      }
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner is required"),
    repositoryName: yup
    .string()
    .required("Repository name is required"),
    rating: yup
    .number()
    .required("Rating is required")
    .positive("Rating should be a positive number")
    .integer("Rating should be an intiger")
    .max(100, "Rating should be between 0 and 100"),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid }) => <SignInForm isValid={isValid} onSubmit={handleSubmit} />}
    </Formik>
  );
}

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, text } = values;
    const rating = Number(values.rating);
    try {
      await createReview({ review: { ownerName, repositoryName, rating, text } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <SignInContainer onSubmit={onSubmit} />
  );
};

export default ReviewForm;
