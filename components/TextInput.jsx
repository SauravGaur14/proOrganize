import { forwardRef } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      editable = true,
      onFocus = () => {},
      secureTextEntry = false,
    },
    ref
  ) => {
    return (
      <TextInput
        ref={ref}
        secureTextEntry={secureTextEntry}
        editable={editable}
        onFocus={onFocus}
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        underlineStyle={{
          borderColor: "#6b21a8",
          borderBottomWidth: 2,
        }}
      />
    );
  }
);
export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
  },
});
