import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../components/firebase";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { LogBox } from "react-native";

const HandleCatchScreen = ({ route, navigation }) => {
  const { catchId, catchesData } = route.params;
  const [updatedFishType, setUpdatedFishType] = useState(catchesData.FishType);
  const [updatedLength, setUpdatedLength] = useState(catchesData.Length);
  const [updatedWeight, setUpdatedWeight] = useState(catchesData.Weigth);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const handleSaveChanges = async () => {
    await updateCatchData(catchesData.name, {
      FishType: updatedFishType,
      Length: updatedLength,
      Weight: updatedWeight,
    });

    alert("Catch updated.");
    navigation.navigate("ProfileScreen");
  };

  const updateCatchData = async () => {
    const catchDocRef = doc(
      FIRESTORE_DB,
      "users",
      user.uid,
      "catches",
      catchId
    );

    try {
      await updateDoc(catchDocRef, {
        FishType: updatedFishType,
        Length: updatedLength,
        Weigth: updatedWeight,
      });

      alert("Catch updated.");
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Error updating catch data: ", error);
    }
  };

  return (
    <View>
      <StatusBar style="auto" />
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/fishnet-348012.appspot.com/o/fishnetbackground2.jpg?alt=media&token=0d768446-5028-4754-8edd-7eca19961c0f&_gl=1*w89brk*_ga*MTEwMzY2NDk1NC4xNjk2NTgyOTgy*_ga_CW55HF8NVT*MTY5ODc0NzI4NS41Mi4xLjE2OTg3NDc4NTkuNjAuMC4w"
        style={styles.backgroundImage}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Update catch</Text>
      </View>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.postCatchContainer}>
          <Image
            source={catchesData.ImageUrl}
            style={{ width: 240, height: 180, borderRadius: 10 }}
          />
          <Text>{catchesData.name}</Text>
          <View style={styles.input}>
            <MaterialCommunityIcons name="fish" size={24} color="grey" />
            <TextInput
              placeholder={catchesData.FishType}
              value={updatedFishType}
              onChangeText={setUpdatedFishType}
            />
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons
              name="tape-measure"
              size={24}
              color="grey"
            />
            <TextInput
              placeholder={catchesData.Length}
              value={updatedLength}
              onChangeText={setUpdatedLength}
            />
            <Text style={{ color: "grey" }}>cm</Text>
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons
              name="weight-kilogram"
              size={24}
              color="grey"
            />
            <TextInput
              placeholder={catchesData.Weight}
              value={updatedWeight}
              onChangeText={setUpdatedWeight}
            />
            <Text style={{ color: "grey" }}>kg</Text>
          </View>
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleSaveChanges}
          >
            <Text style={{ color: "white" }}>Update catch!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.postButton, styles.deleteButton]}
            onPress={() => {}}
          >
            <Text style={{ color: "white" }}>Delete catch</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default HandleCatchScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
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
    borderColor: "#2142A9",
    backgroundColor: "#59d0ff",
    paddingHorizontal: 9,
    paddingVertical: 7,
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
  deleteButton: {
    backgroundColor: "#ff365e",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    width: 230,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2142A9",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
