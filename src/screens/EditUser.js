import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../components/firebase";
import ImageSelector from "../components/ImageSelector";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";

const EditUser = ({ route }) => {
  const { userInfo } = route.params;
  const [newFirstName, setNewFirstName] = useState(userInfo.FirstName);
  const [newLastName, setNewLastName] = useState(userInfo.LastName);
  const [newUsername, setNewUsername] = useState(userInfo.UserName);
  const [imageUrl, setImageUrl] = useState(userInfo.ImageUrl);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const navigation = useNavigation();

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

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
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/fishnet-348012.appspot.com/o/fishnetbackground2.jpg?alt=media&token=0d768446-5028-4754-8edd-7eca19961c0f&_gl=1*w89brk*_ga*MTEwMzY2NDk1NC4xNjk2NTgyOTgy*_ga_CW55HF8NVT*MTY5ODc0NzI4NS41Mi4xLjE2OTg3NDc4NTkuNjAuMC4w"
        style={styles.backgroundImage}
      />
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
      <TouchableOpacity onPress={handleSaveChanges} style={styles.postButton}>
        <Text style={{ color: "white" }}>Save Changes</Text>
      </TouchableOpacity>
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
    backgroundColor: "white",
    width: 230,
    height: 55,
    marginVertical: 12,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2142A9",
    flexDirection: "row",
    gap: 10,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  postButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#218cde",
    width: 150,
    height: 60,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
