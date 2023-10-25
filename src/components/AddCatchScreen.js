import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const AddCatchScreen = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [fishType, setFishType] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
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
    try {
      // First, upload the image to Firebase Storage and get the download URL
      const imageUrl = await uploadCatchImage(user.uid, image);

      // Then, add catch data to Firestore
      const catchData = {
        FishType: fishType,
        Length: length,
        Weight: weight,
        ImageUrl: imageUrl,
        UserId: user.uid,
        // Location: new FIREBASE_APP.FIRESTORE_DB.GeoPoint(latitude, longitude),
      };

      const catchRefId = await addCatchToFirestore(catchData, user);
      if (catchRefId) {
        alert("Catch posted!");
        navigation.navigate("HomeScreen");
      } else {
        alert("Catch upload failed!!!!");
      }
    } catch (error) {
      console.error("Error adding catch: ", error);
      alert("Catch upload failed: ", error.message);
    }
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Post a new catch</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.postCatchContainer}
        behavior="padding"
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 240, height: 180, borderRadius: 10 }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleImagePick}>
          <Feather name="upload" size={24} color="black" />
          <Text>Upload photo from library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCameraCapture}>
          <Feather name="camera" size={24} color="black" />
          <Text>Take photo</Text>
        </TouchableOpacity>
        <View style={styles.input}>
          <MaterialCommunityIcons name="fish" size={24} color="grey" />
          <TextInput
            placeholder="Fishtype"
            value={fishType}
            onChangeText={setFishType}
          />
        </View>
        <View style={styles.input}>
          <MaterialCommunityIcons name="tape-measure" size={24} color="grey" />
          <TextInput
            placeholder="Length in cm"
            value={length}
            onChangeText={setLength}
          />
        </View>
        <View style={styles.input}>
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={24}
            color="grey"
          />
          <TextInput
            placeholder="Weight in kg"
            value={weight}
            onChangeText={setWeight}
          />
        </View>
        <TouchableOpacity style={styles.postButton} onPress={handleAddCatch}>
          <Text style={{ color: "white" }}>Post catch!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddCatchScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
  headingText: {
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  postCatchContainer: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    width: 230,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  postButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    width: 150,
    height: 60,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  input: {
    flexDirection: "row",
    gap: 7,
    width: 230,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
});
