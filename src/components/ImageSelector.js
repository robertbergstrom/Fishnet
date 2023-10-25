import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { uploadProfileImage } from "./firebase";
import { getAuth } from "firebase/auth";

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const takeImageHandler = async (e) => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    setSelectedImage(image);
    if (image && !image.canceled) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      uploadProfileImage(blob, user, setLoading);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!user.photoURL ? (
          <Image
            style={styles.image}
            src="https://images.pexels.com/photos/2968938/pexels-photo-2968938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Avatar"
          />
        ) : (
          <Image style={styles.image} src={user.photoURL} />
        )}
      </View>
      <TouchableOpacity onPress={takeImageHandler} style={styles.cameraButton}>
        <Feather name="camera" size={24} color="black" />
        <Text>New Profile Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    width: 170,
    height: 170,
    marginBottom: 50,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
});
