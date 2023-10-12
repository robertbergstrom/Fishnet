import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { FIREBASE_AUTH } from "./firebase";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const handleEditUser = () => {
    navigation.navigate("EditUser");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} />
        </View>
        <View style={styles.profileDisplayText}>
          <Text>{auth.currentUser.displayName}</Text>
          <Text>{auth.currentUser.email}</Text>
        </View>
        <TouchableOpacity onPress={handleEditUser} style={styles.editButton}>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Button title="Open Modal" onPress={() => setModalVisible(true)} />

      <Modal isVisible={isModalVisible} style={styles.modalContainer}>
        <View>
          <Text>This is your modal content</Text>
          <Button title="Close Modal" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 40,
    marginVertical: 120,
  },
  profileCard: {
    width: "90%",
    height: 200,
    borderWidth: 0.5,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  profileImageContainer: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderRadius: 50,
    width: 160,
    height: 160,
  },
  profileImage: {},
});
export default Profile;
