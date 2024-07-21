import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "../constants";

export default function Button({ label, type, onPress }) {
  return (
    <Pressable style={[styles.button, styles[`${type}`]]} onPress={onPress}>
      <Text style={styles[`${type}ButtonText`]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 100,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  primary: {
    textAlign: "center",
    borderWidth: 1.5,
    backgroundColor: Colors.greenPrimary,
    borderColor: Colors.greenPrimary,
  },
  secondary: {
    borderWidth: 1.5,
    borderColor: "red",
    textAlign: "center",
  },
  primaryButtonText: {
    fontSize: 20,
    color: "#ffff",
    fontWeight: "bold",
  },
  secondaryButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.blackPrimary,
  },
});
