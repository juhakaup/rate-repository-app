import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    errorInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        margin: 7
    },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={error ? styles.errorInput : textInputStyle} {...props} />;
};

export default TextInput;