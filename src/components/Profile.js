import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View>
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
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 40,
    marginVertical: 120,
  },
});
export default Profile;
