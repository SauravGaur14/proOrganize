import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants";
import { showToast } from "../util/showToast";

export default function SettingsScreen() {
  function handleSignOut() {
    const auth = getAuth();
    try {
      signOut(auth);
    } catch (error) {
      showToast("error", "Please try again later");
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Ionicons name="exit" size={38} color="#991b1b" />
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    gap: 40,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 10,
    flexDirection: "row",
    paddingHorizontal: 80,
    backgroundColor: Colors.modalBackground,
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});
