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
  ref,
} from "firebase/firestore";
import {
  FIRESTORE_DB,
  checkIfUserIsFollowing,
  addFollower,
  addFollowing,
  removeFollowing,
  removeFollower,
} from "../components/firebase";
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
    const batch = writeBatch(FIRESTORE_DB);
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
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/fishnet-348012.appspot.com/o/fishnetbackground2.jpg?alt=media&token=0d768446-5028-4754-8edd-7eca19961c0f&_gl=1*w89brk*_ga*MTEwMzY2NDk1NC4xNjk2NTgyOTgy*_ga_CW55HF8NVT*MTY5ODc0NzI4NS41Mi4xLjE2OTg3NDc4NTkuNjAuMC4w"
        style={styles.backgroundImage}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Explore anglers</Text>
      </View>
      <FlatList
        data={searchTerm ? searchResults : []}
        key={(item) => {
          return item.UserId;
        }}
        renderItem={({ item }) => (
          <View style={styles.profileCard}>
            <Image
              source={{ uri: item.ImageUrl }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={{ color: "white" }}>{item.UserName}</Text>
              <Text style={{ color: "white" }}>Catches: {item.catchCount}</Text>
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
                    color="white"
                  />
                  <Text style={{ color: "white" }}>
                    {following ? "Unfollow" : "Follow"}
                  </Text>
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
    padding: 16,
    borderTopWidth: 2,
    borderColor: "#0782F9",
  },
  searchBarInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "white",
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
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#218cde",
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
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
