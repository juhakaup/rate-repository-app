import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const initialValues = {
    username: '',
    password: '',
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius: 4,
        margin: 7
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        margin: 7,
        borderRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: theme.colors.textLight
    }
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" style={styles.textInput}/>
        <FormikTextInput name="password" placeholder="Password" style={styles.textInput}/>
        <Pressable onPress={onSubmit} style={styles.button}>
            <Text fontWeight={'bold'} style={styles.buttonText}>Sign in</Text>
        </Pressable>
    </View>
  )
};

const SignIn = () => {
    const onSubmit = values => {
        console.log(values)
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default SignIn;