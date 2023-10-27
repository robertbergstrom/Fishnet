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
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const EditUser = ({ route }) => {
  const { userInfo } = route.params;
  const [newFirstName, setNewFirstName] = useState(userInfo.FirstName);
  const [newLastName, setNewLastName] = useState(userInfo.LastName);
  const [newUsername, setNewUsername] = useState(userInfo.UserName);
  const [imageUrl, setImageUrl] = useState(userInfo.ImageUrl);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const navigation = useNavigation();

  const handleImageSelected = (url) => {
    setImageUrl(url);
  };

  const handleSaveChanges = () => {
    setDoc(doc(FIRESTORE_DB, "users", user.uid), {
      UserName: newUsername,
      FirstName: newFirstName,
      LastName: newLastName,
      ImageUrl: user.photoURL,
    });

    userInfo.UserName = newUsername;
    userInfo.FirstName = newFirstName;
    userInfo.LastName = newLastName;
    userInfo.ImageUrl = imageUrl;

    alert("Profile updated.");
    navigation.navigate("ProfileScreen");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <ImageSelector />
      {!userInfo.UserName ? (
        <TextInput
          placeholder="New Username"
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
          style={styles.input}
        />
      ) : (
        <TextInput
          placeholder={userInfo.UserName}
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
          style={styles.input}
        />
      )}
      {!userInfo.FirstName ? (
        <TextInput
          placeholder="New Firstname"
          value={newFirstName}
          onChangeText={(text) => setNewFirstName(text)}
          style={styles.input}
        />
      ) : (
        <TextInput
          placeholder={userInfo.UserName}
          value={newFirstName}
          onChangeText={(text) => setNewFirstName(text)}
          style={styles.input}
        />
      )}
      {!userInfo.LastName ? (
        <TextInput
          placeholder="New Lastname"
          value={newLastName}
          onChangeText={(text) => setNewLastName(text)}
          style={styles.input}
        />
      ) : (
        <TextInput
          placeholder={userInfo.UserName}
          value={newLastName}
          onChangeText={(text) => setNewLastName(text)}
          style={styles.input}
        />
      )}

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
