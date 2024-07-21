import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { Image } from "expo-image";
import Input from "../components/TextInput";
import { Colors } from "../constants";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Main");
    } catch (error) {
      if (error.code === "auth/invalid-email")
        alert("Please enter a valid Email");
      else if (error.code === "auth/invalid-credential")
        alert("Login Failed \nInvalid credentials");
      else if (error.code === "auth/too-many-requests")
        alert("Too many login attempts \nTry again later");
      else alert("Login Failed.\nTry again later");
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      navigation.replace("Main");
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("User already exits!\nPlease use a different Email");
      else alert("Signup Failed.\nTry again later");
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          contentFit="contain"
          height={200}
          width={200}
          source={require("../assets/appLogo.svg")}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formContainer}
        >
          <View style={styles.inputContainer}>
            {isSigningUp && (
              <Input label="Name" value={name} onChangeText={setName} />
            )}
            <Input
              keyboardType="email-address"
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              secureTextEntry
              label="Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={isSigningIn ? handleLogin : handleSignUp}
            >
              <Text style={styles.buttonText}>
                {isSigningIn ? "Login" : "Signup"}
              </Text>
            </TouchableOpacity>
          </View>
          <Pressable
            onPress={() => {
              setIsSigningIn(!isSigningIn);
              setIsSigningUp(!isSigningUp);
            }}
          >
            <Text style={styles.text}>
              {isSigningIn ? (
                <Text>
                  Don't have an account ?{" "}
                  <Text style={{ color: "#2196F3", fontWeight: "bold" }}>
                    Signup
                  </Text>
                </Text>
              ) : (
                <Text>
                  Have an account ?{" "}
                  <Text style={{ color: "#2196F3", fontWeight: "bold" }}>
                    Login
                  </Text>
                </Text>
              )}
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    gap: 40,
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },

  formContainer: {
    width: "100%",
  },
  imageContainer: {
    marginBottom: 10,
    alignItems: "center",
  },

  inputContainer: {
    gap: 15,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    marginBottom: 40,
  },
  input: {
    fontSize: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 15,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    textAlign: "ceter",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 200,
    marginBottom: 30,
    backgroundColor: Colors.greenPrimary,
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
});
