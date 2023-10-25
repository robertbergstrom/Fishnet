import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Octicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import HomeHeader from "./HomeHeader";

export default function Home() {
  const navigation = useNavigation();

  const handleAddCatch = () => {
    navigation.navigate("AddCatchScreen");
  };

  const fishfacts = () => {
    navigation.navigate("FishfactsScreen");
  };

  const explore = () => {
    navigation.navigate("ExploreScreen");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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

      <ScrollView style={styles.feedContainer}>
        {/* Loop through the firebase database for feed */}
        <View style={styles.catchContainer}>
          <View style={styles.catchHeader}>
            <TouchableOpacity>
              <View style={styles.imageAndUsernameContainer}>
                <Image
                  style={styles.userImage}
                  src="https://images.pexels.com/photos/2968938/pexels-photo-2968938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                />
                <Text style={styles.username}>Username</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.catchImage}
            src="https://images.pexels.com/photos/3793366/pexels-photo-3793366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
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
              <TouchableOpacity>
                <Feather name="info" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
});
