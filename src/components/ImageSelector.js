import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { FIRESTORE_DB, uploadProfileImage } from "./firebase";
import { getAuth } from "firebase/auth";

const ImageSelector = ({ onImageSelected }) => {
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
      <TouchableOpacity onPress={takeImageHandler} style={styles.button}>
        <Feather name="camera" size={24} color="black" />
        <Text>Take photo</Text>
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
    marginBottom: 60,
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    width: 230,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2142A9",
    backgroundColor: "#59d0ff",
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});
