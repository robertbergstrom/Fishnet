import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import {
  uploadCatchImage,
  addCatchToFirestore,
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIRESTORE_DB,
} from "./firebase";
import { useNavigation } from "@react-navigation/native";

const AddCatchScreen = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [fishType, setFishType] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  // const [datetime, setDatetime] = useState(Date);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const navigation = useNavigation();

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Camera roll access required to pick an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.uri);

      // Extract location data from the image's EXIF data
      const exifData = await Exif.getExif(result.uri);
      const latitude = exifData.GPSLatitude;
      const longitude = exifData.GPSLongitude;

      // Now, you can use latitude and longitude to set the Location field in your Firestore document.
    }
  };

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location access required to capture the location.");
      return null;
    }
    return Location.getCurrentPositionAsync({});
  };

  const handleCameraCapture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (status !== "granted") {
      alert("Camera access required to take a photo.");
      return;
    }

    const locationPermission = await getLocationPermission();

    if (locationPermission) {
      // Get the captured location
      const { coords } = locationPermission;
      const latitude = coords.latitude;
      const longitude = coords.longitude;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddCatch = async () => {
    // First, upload the image to Firebase Storage and get the download URL
    const imageUrl = await uploadCatchImage(user.uid, image);

    // Then, add catch data to Firestore
    const catchData = {
      FishType: fishType,
      Length: length,
      Weight: weight,
      ImageUrl: imageUrl,
      UserId: user.uid,
      Location: new FIREBASE_APP.FIRESTORE_DB.GeoPoint(latitude, longitude),
      // Other catch data fields here
    };

    addCatchToFirestore(catchData);
    alert("Catch posted!");
    navigation.navigate("ProfileScreen");
  };

  return (
    <KeyboardAvoidingView>
      <Text>Post a catch</Text>
      <Button title="Choose from Library" onPress={handleImagePick} />
      <Button title="Take a Photo" onPress={handleCameraCapture} />

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TextInput
        placeholder="Fish Type"
        value={fishType}
        onChangeText={setFishType}
      />
      <TextInput
        placeholder="Length in cm"
        value={length}
        onChangeText={setLength}
      />
      <TextInput
        placeholder="Weight in kg"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Post Catch" onPress={handleAddCatch} />
    </KeyboardAvoidingView>
  );
};

export default AddCatchScreen;
