import {
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./firebase";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";

const SignUp = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPassword
      );
      const user = response.user;
      const userRef = doc(FIRESTORE_DB, "users", user.uid);
      await setDoc(userRef, {
        Email: newEmail,
        UserId: user.uid,
        UserName: newUsername,
        PhoneNumber: "",
        ImageUrl: "",
      });
      console.log(response);
      alert("Account successfully created.");
    } catch (error) {
      console.log(error);
      alert("Account creation failed: " + error.message);
    } finally {
      setLoading(false);
      navigation.navigate("Login");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="auto" />
      <Text style={styles.logoText}>Fishnet</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={register}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Create account</Text>
            </TouchableOpacity>
            <Text>Already have an account? Login below</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "60%",
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  logoText: {
    fontSize: 50,
    fontWeight: "bold",
  },
});
