import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const navigate = useNavigation();
  function handleSignOut() {
    alert("sign out");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("Login");
      })
      .catch((error) => {
        alert("Some error");
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Ionicons name="exit" size={38} color="black" />
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    backgroundColor: "#f6f6f6",
    borderColor: "#f6f6",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    gap: 40,
    width: "99%",
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
  },
});
