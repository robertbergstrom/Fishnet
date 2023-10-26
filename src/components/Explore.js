import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import {
  FIRESTORE_DB,
  checkIfUserIsFollowing,
  addFollower,
  addFollowing,
  removeFollowing,
  removeFollower,
} from "./firebase";
import { getAuth } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [followingStatus, setFollowingStatus] = useState({});
  const currentUser = getAuth().currentUser;

  // Searchterm handling
  useEffect(() => {
    if (searchTerm) {
      console.log("Fetching data for searchTerm:", searchTerm);
      const usersRef = collection(FIRESTORE_DB, "users");
      const q = query(
        usersRef,
        where("UserName", ">=", searchTerm),
        where("UserName", "<=", searchTerm + "\uf8ff")
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const results = [];
        for (const doc of snapshot.docs) {
          const userData = doc.data();
          const userCatchesRef = collection(
            FIRESTORE_DB,
            "users",
            doc.id,
            "catches"
          );
          const userCatchesQuery = query(userCatchesRef);
          const userCatchesSnapshot = await getDocs(userCatchesQuery);
          const catchCount = userCatchesSnapshot.size;
          results.push({ ...userData, catchCount });
        }
        console.log("Fetched users:", results);
        setSearchResults(results);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Check isFollowed
  useEffect(() => {
    const currentUser = getAuth().currentUser;

    if (currentUser) {
      const currentUserId = currentUser.uid;
      const resultsWithFollowStatus = [...searchResults]; // Copy the existing search results

      (async () => {
        for (const user of searchResults) {
          const followingRef = doc(
            FIRESTORE_DB,
            "users",
            currentUserId,
            "following",
            user.id
          );
          const followingDoc = await getDoc(followingRef);
          const isFollowing = followingDoc.exists;
          // Find the corresponding user in resultsWithFollowStatus and update isFollowing
          const updatedUser = resultsWithFollowStatus.find(
            (resultUser) => resultUser.id === user.id
          );
          if (updatedUser) {
            updatedUser.isFollowing = isFollowing;
          }
        }

        setSearchResults(resultsWithFollowStatus);
      })();
    }
  }, [searchResults]);

  const handleFollowUser = async (followedUserId) => {
    try {
      const isFollowing = checkIfUserIsFollowing(currentUser, followedUserId);

      if (isFollowing) {
        await removeFollowing(currentUser, followedUserId);
        await removeFollower(followedUserId, currentUser.uid);
      } else {
        await addFollower(currentUser, followedUserId);
        await addFollowing(currentUser, followedUserId);
      }

      // Update followingStatus state to reflect the change
      setFollowingStatus((prevFollowingStatus) => ({
        ...prevFollowingStatus,
        [followedUserId]: { isFollowing: !isFollowing },
      }));
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Explore anglers</Text>
      </View>
      <FlatList
        data={searchTerm ? searchResults : []}
        keyExtractor={(item) => item.UserId}
        renderItem={({ item }) => {
          const isFollowing =
            followingStatus[item.UserId]?.isFollowing || false;

          return (
            <View style={styles.profileCard}>
              <Image
                source={{ uri: item.ImageUrl }}
                style={styles.profileImage}
              />
              <View style={styles.userInfo}>
                <Text>{item.UserName}</Text>
                <Text>Catches: {item.catchCount}</Text>
              </View>
              <TouchableOpacity
                style={styles.followButton}
                onPress={() => handleFollowUser(item.UserId)}
              >
                <Feather
                  name={isFollowing ? "user-minus" : "user-plus"}
                  size={20}
                  color="#333"
                />
                <Text>{isFollowing ? "Unfollow" : "Follow"}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBarInputContainer}>
            <TextInput
              placeholder="Search by username"
              style={styles.searchBarInput}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Explore;

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
  container: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  searchBarInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },
  searchBarInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchBarButton: {
    padding: 10,
  },
  profileCard: {
    padding: 10,
    margin: 10,
    height: 150,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  userInfo: {
    height: 150,
    justifyContent: "space-evenly",
  },
  followButton: {
    alignItems: "center",
    padding: 10,
  },
});
