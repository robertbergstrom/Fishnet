// EditUser.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "./firebase";
import { RNCamera } from "react-native-camera";
import ImageResizer from "react-native-image-resizer";

const EditUser = () => {
  const navigation = useNavigation();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const auth = FIREBASE_AUTH;

  const CameraScreen = ({ onPictureTaken }) => {
    const takePicture = async (camera) => {
      if (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        onPictureTaken(data.base64);
      }
    };

    const resizeAndCompressImage = (
      base64Image,
      maxWidth,
      maxHeight,
      quality
    ) => {
      return new Promise((resolve, reject) => {
        ImageResizer.createResizedImage(
          `data:image/jpeg;base64,${base64Image}`,
          maxWidth,
          maxHeight,
          "JPEG",
          quality
        )
          .then((resizedImage) => {
            resolve(resizedImage.uri);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const handleSaveChanges = () => {
      // Get the current user
      const user = auth.currentUser;

      // Update the username
      if (newUsername) {
        user
          .updateProfile({
            displayName: newUsername,
          })
          .then(() => {
            // Username updated successfully
            auth.currentUser.updateProfile(update);
          })
          .catch((error) => {
            console.error("Error updating username:", error);
          });
      }

      // Update the password
      if (newPassword) {
        user
          .updatePassword(newPassword)
          .then(() => {
            // Password updated successfully
          })
          .catch((error) => {
            console.error("Error updating password:", error);
          });

        // Navigate back to the Profile screen
        navigation.navigate("Profile");
      }
    };
    return (
      <View style={styles.container}>
        <Text>Edit User Screen</Text>

        <View style={{ flex: 1 }}>
          <RNCamera
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.front}
            captureAudio={false}
          />
          <Button
            title="Take Picture"
            onPress={() => takePicture(this.camera)}
          />
        </View>

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
      </View>
    );
  };
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
    marginBottom: 15,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
});
