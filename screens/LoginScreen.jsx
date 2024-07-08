import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";
import { auth } from "../config/firebase";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the home screen upon successful login
      navigation.replace("Main");
    } catch (error) {
      alert("Login Failed");
      console.log("Login Failed", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to the home screen upon successful sign-up
      navigation.replace("Main");
    } catch (error) {
      alert("Sign Up Failed");
      console.log("Sign Up Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />
      <View style={{}}>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    overflow: "hidden",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
  },
});
