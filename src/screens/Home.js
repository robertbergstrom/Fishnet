import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Octicons } from "@expo/vector-icons";
import HomeHeader from "../components/HomeHeader";
import { StatusBar } from "expo-status-bar";
import { getAllUsersAndCatches } from "../components/firebase";

export default function Home() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [selectedCatch, setSelectedCatch] = useState(null); // For the selected catch
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility

  const handleAddCatch = () => {
    navigation.navigate("AddCatchScreen");
  };

  const fishfacts = () => {
    navigation.navigate("FishfactsScreen");
  };

  const explore = () => {
    navigation.navigate("ExploreScreen");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const combinedData = await getAllUsersAndCatches();
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const openModal = (catchData) => {
    setSelectedCatch(catchData);
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="auto" />
      <HomeHeader />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={fishfacts} style={styles.button}>
          <Text style={styles.buttonText}>Fish facts</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postButtonContainer}>
        <TouchableOpacity onPress={handleAddCatch} style={styles.postButton}>
          <Feather name="plus" size={24} color="#0782F9" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity onPress={explore} style={styles.button}>
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.feedContainer}
        data={data}
        key={(item) => {
          return item.name;
        }}
        renderItem={({ item }) => (
          <View style={styles.catchContainer}>
            <View style={styles.catchHeader}>
              <TouchableOpacity>
                <View style={styles.imageAndUsernameContainer}>
                  <Image
                    style={styles.userImage}
                    src={item.userData.ImageUrl}
                  />
                  <Text style={styles.username}>{item.userData.UserName}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Feather name="more-horizontal" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Image style={styles.catchImage} src={item.catchData.ImageUrl} />
            <View style={styles.catchFooter}>
              <TouchableOpacity>
                <Text style={styles.username}>142 likes</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.commentText}>19 comments</Text>
              </TouchableOpacity>
              <View style={styles.footerIcons}>
                <TouchableOpacity>
                  <Octicons name="comment" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="heart" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal(item.catchData)}>
                  <Feather name="info" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Additional info</Text>
          <Text>Fish Type: {selectedCatch?.FishType}</Text>
          <Text>Length: {selectedCatch?.Length}</Text>
          <Text>Weight: {selectedCatch?.Weight}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 90,
    height: 40,
    position: "absolute",
    zIndex: 2,
    bottom: "5%",
    right: "10%",
  },
  postButtonContainer: {
    width: 70,
    height: 70,
    position: "absolute",
    zIndex: 2,
    bottom: "3%",
  },
  searchButtonContainer: {
    width: 90,
    height: 40,
    position: "absolute",
    zIndex: 2,
    bottom: "5%",
    left: "10%",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#0782F9",
    width: "100%",
    height: "100%",
    borderRadius: 55,
    alignItems: "center",
  },
  postButton: {
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderRadius: 55,
    borderColor: "#0782F9",
    borderWidth: 2,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "500",
    fontSize: 12,
  },
  feedContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  catchContainer: {
    width: "100%",
    height: 360,
    backgroundColor: "lightgrey",
    borderTopWidth: 0.5,
    borderTopColor: "grey",
  },
  catchHeader: {
    backgroundColor: "white",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  imageAndUsernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  catchImage: {
    width: "100%",
    height: 250,
  },
  catchFooter: {
    backgroundColor: "white",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  footerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  commentText: {
    color: "grey",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 40,
    marginVertical: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    width: 300,
    height: 200,
    borderWidth: 2,
  },
});
