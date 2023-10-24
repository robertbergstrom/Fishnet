import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./firebase";
import ImageSelector from "./ImageSelector";
import { doc, setDoc } from "firebase/firestore";

const EditUser = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  const handleSaveChanges = () => {
    changePassword = (currentPassword, newPassword) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          var user = auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              console.log("Password updated!");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    updateUsername = async () => {
      await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
        UserName: newUsername,
      });
    };
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ImageSelector />

      <TextInput
        placeholder="New Username"
        value={newUsername}
        onChangeText={(text) => setNewUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </KeyboardAvoidingView>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    marginVertical: 15,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
