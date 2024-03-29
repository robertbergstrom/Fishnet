import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FIREBASE_AUTH } from "../components/firebase";
import { deleteUser } from "firebase/auth";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Settings = () => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/fishnet-348012.appspot.com/o/fishnetbackground2.jpg?alt=media&token=0d768446-5028-4754-8edd-7eca19961c0f&_gl=1*w89brk*_ga*MTEwMzY2NDk1NC4xNjk2NTgyOTgy*_ga_CW55HF8NVT*MTY5ODc0NzI4NS41Mi4xLjE2OTg3NDc4NTkuNjAuMC4w"
        style={styles.backgroundImage}
      />
      <TouchableOpacity
        onPress={() => auth.signOut()}
        style={styles.postButton}
      >
        <Text style={{ color: "white" }}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}} style={styles.postButton}>
        <Text style={{ color: "white" }}>Delete account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.postButton}
      >
        <Feather name="info" size={24} color="white" />
        <Text style={{ color: "white" }}>About</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        style={styles.modalContainer}
        animationType="slide"
      >
        <ScrollView style={styles.aboutContainer}>
          <Text style={styles.aboutHeader}>
            About Our Fishing Community App
          </Text>
          <Text style={styles.aboutText}>
            Welcome to Fishnet, the ultimate platform for fishing enthusiasts to
            connect, share, and explore the exciting world of fishing. Our app
            is designed with a passion for fishing and a commitment to creating
            a vibrant and inclusive community for anglers of all levels.
          </Text>
          <Text style={styles.aboutHeader}>Our Mission</Text>
          <Text style={styles.aboutText}>
            At Fishnet, our mission is to bring together the global fishing
            community and provide a space where anglers can: Share Their
            Catches: Share your thrilling fishing adventures with the world.
            Whether it's the catch of the day or a memorable fishing trip,
            capture your moments and showcase your skills. Connect with Fellow
            Anglers: Connect with like-minded individuals who share your passion
            for fishing. Follow your favorite anglers, join conversations, and
            discover new friends who love the sport as much as you do. Learn and
            Grow: Dive into a world of fishing knowledge. Learn from the
            experiences of seasoned anglers, access tips and tricks, and stay
            updated on the latest trends in the fishing world.
          </Text>
          <Text style={styles.aboutHeader}>Key features</Text>
          <Text style={styles.aboutText}>
            Capture and Share: Our app allows you to easily snap and upload
            photos of your catches. Share your fishing stories, record your
            achievements, and create lasting memories. Community Interaction:
            Engage in discussions, ask questions, and provide insights. Our app
            fosters a supportive community where anglers can learn from one
            another. Discover Great Locations: Explore new fishing spots and
            access location data from other community members. Find the perfect
            fishing spot for your next adventure. Profile Customization:
            Customize your profile, showcase your favorite catches, and let
            others know about your fishing journey.
          </Text>
          <Text style={styles.aboutHeader}>Get started today</Text>
          <Text style={styles.aboutText}>
            Fishnet is more than just an app; it's a hub for anglers to come
            together, learn, connect, and celebrate the joy of fishing. Whether
            you're a seasoned pro or just getting started, our community
            welcomes you with open arms. Download the app today and become a
            part of our thriving fishing community. Join us in making every
            fishing trip a memorable experience. Happy fishing!
          </Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.aboutButton}
        >
          <Feather name="x" size={24} color="black" />
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 40,
    marginVertical: 80,
    alignItems: "center",
  },
  postButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#218cde",
    width: 150,
    height: 50,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  aboutContainer: {
    marginHorizontal: 30,
    marginVertical: 40,
    height: 200,
  },
  aboutHeader: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  aboutText: {
    borderBottomWidth: 0.5,
    marginVertical: 5,
    paddingBottom: 10,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
