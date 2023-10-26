import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
  queryEqual,
} from "firebase/firestore";
import {
  FIRESTORE_DB,
  checkIfUserIsFollowing,
  addFollower,
  addFollowing,
  removeFollowing,
  removeFollower,
} from "./firebase"; // Import your Firebase functions
import { Feather } from "@expo/vector-icons";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [followingStatus, setFollowingStatus] = useState({}); // Local state to track following status

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    const fetchData = async () => {
      try {
        const usersQuery = query(collection(FIRESTORE_DB, "users"));
        const usersSnapshot = await getDocs(usersQuery);

        const usersData = {};

        for (const doc of usersSnapshot.docs) {
          const userData = doc.data();
          const userId = doc.id;
          const isFollowing = await checkIfUserIsFollowing(currentUser, userId);
          usersData[userId] = { ...userData, isFollowing };
        }

        setData(usersData);
        setFollowingStatus(usersData); // Initialize followingStatus with user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      // Create a reference to the "users" collection
      const usersRef = collection(FIRESTORE_DB, "users");

      // Create a query to search for users whose username contains the search term
      const q = query(
        usersRef,
        where("UserName", ">=", searchTerm),
        where("UserName", "<=", searchTerm + "\uf8ff") // '\uf8ff' is a special character that ensures the search term is a prefix
      );

      // Attach a listener to the query
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push(doc.data());
        });
        setSearchResults(results);
      });

      // Clean up the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    } else {
      // If the search term is empty, clear the results
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const currentUser = getAuth().currentUser;
      const usersQuery = query(collection(FIRESTORE_DB, "users"));
      const usersSnapshot = await getDocs(usersQuery);

      const filteredUsers = {};

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        const userId = doc.id;
        const isFollowing = await checkIfUserIsFollowing(currentUser, userId);

        if (
          userData.UserName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          filteredUsers[userId] = { ...userData, isFollowing };
        }
      }

      setSearchResults(filteredUsers);

      // Update followingStatus to include all items in searchResults
      setFollowingStatus((prevFollowingStatus) => ({
        ...prevFollowingStatus,
        ...filteredUsers,
      }));
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleFollowUser = async (followedUserId, isFollowing) => {
    const currentUser = getAuth().currentUser;
    if (isFollowing) {
      await removeFollowing(currentUser, followedUserId);
      await removeFollower(followedUserId, currentUser.uid);
    } else {
      await addFollower(currentUser, followedUserId);
      await addFollowing(currentUser, followedUserId);
    }

    // Update the followingStatus state to reflect the change
    setFollowingStatus((prevFollowingStatus) => ({
      ...prevFollowingStatus,
      [followedUserId]: {
        ...prevFollowingStatus[followedUserId],
        isFollowing: !isFollowing,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Explore anglers</Text>
      </View>
      <FlatList
        data={searchTerm ? searchResults : []}
        keyExtractor={(item) => item.UserId}
        renderItem={({ item }) => {
          // Check if item is undefined in followingStatus, and handle accordingly
          if (!followingStatus[item.UserId]) {
            return null;
          }

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
                onPress={() => handleFollowUser(item.UserId, item.isFollowing)}
              >
                <Feather
                  name={
                    followingStatus[item.UserId].isFollowing
                      ? "user-minus"
                      : "user-plus"
                  }
                  size={20}
                  color="#333"
                />
                <Text>
                  {followingStatus[item.UserId].isFollowing
                    ? "Unfollow"
                    : "Follow"}
                </Text>
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
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchBarButton}
            >
              <Feather name="search" size={20} color="#333" />
            </TouchableOpacity>
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
