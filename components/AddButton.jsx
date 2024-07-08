import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function AddButton({onPress}) {
  return (
    <Pressable style={styles.addButton} onPress={onPress}>
      <MaterialIcons name="add" size={50} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    padding: 5,
    bottom: 50,
    right: 30,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "#0A0A0A",
    overflow: "hidden",
    elevation: 10,
  },
});
