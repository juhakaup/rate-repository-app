import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
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
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        autoCapitalize="none"
        placeholder="Username"
        style={styles.textInput}
      />
      <FormikTextInput
        secureTextEntry
        name="password"
        placeholder="Password"
        style={styles.textInput}
      />
      <FormikTextInput
        secureTextEntry
        name="passwordConfirmation"
        placeholder="Password confirmation"
        style={styles.textInput}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 charaters long")
    .max(30, "Username length cannot exceed 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password should be at least 5 characters long")
    .max(50, "Password lenght cannot exceed 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], "Confirmation does not match the password")
    .required("Password confirmation is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    const user = { username, password }
    try {
      await createUser(user);
      await signIn(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignUp;
