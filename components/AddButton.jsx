import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function AddButton({ onPress }) {
  return (
    <Pressable style={styles.addButton} onPress={onPress}>
      <MaterialIcons name="add" size={45} color="#d1d5db" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 30,
    padding: 5,
    bottom: 50,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "#01631d",
    elevation: 10,
  },
});
