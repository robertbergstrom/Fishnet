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
  deleteDoc,
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
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        setSearchResults(results);
        console.log("Search results:", searchResults);
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const onFollow = async (followUserId) => {
    const followsRef = doc(
      FIRESTORE_DB,
      "users",
      getAuth().currentUser.uid,
      "following",
      followUserId
    );
    const followedRef = doc(
      FIRESTORE_DB,
      "users",
      followUserId,
      "followers",
      getAuth().currentUser.uid
    );
    await setDoc(followsRef);
    await setDoc(followedRef);
  };
  const onUnfollow = async (unfollowUserId) => {
    const unfollowsRef = doc(
      FIRESTORE_DB,
      "users",
      getAuth().currentUser.uid,
      "following",
      unfollowUserId
    );
    const unfollowedRef = doc(
      FIRESTORE_DB,
      "users",
      unfollowUserId,
      "followers",
      getAuth().currentUser.uid
    );
    await deleteDoc(unfollowsRef);
    await deleteDoc(unfollowedRef);
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
        renderItem={({ item }) => (
          <View style={styles.profileCard}>
            <Image
              source={{ uri: item.ImageUrl }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text>{item.UserName}</Text>
              <Text>Catches: {item.catchCount}</Text>
            </View>
            {item.UserId !== getAuth().currentUser.uid ? (
              <View>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={
                    following
                      ? () => onUnfollow(item.UserId)
                      : () => onFollow(item.UserId)
                  }
                >
                  <Feather
                    name={following ? "user-minus" : "user-plus"}
                    size={20}
                    color="#333"
                  />
                  <Text>{following ? "Unfollow" : "Follow"}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
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
