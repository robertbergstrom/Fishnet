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
} from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    await fetchUserData();
  };

  useEffect(() => {
    if (searchTerm) {
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
        setSearchResults(results);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Explore anglers</Text>
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.UserId}
        renderItem={({ item }) => (
          <View style={styles.profileCard}>
            <Image src={item.ImageUrl} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text>{item.UserName}</Text>
              <Text>Catches: {item.catchCount}</Text>
            </View>
            <TouchableOpacity style={styles.followButton} onPress={() => {}}>
              <Feather name="user-plus" size={20} color="#333" />
              <Text>Follow</Text>
            </TouchableOpacity>
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
