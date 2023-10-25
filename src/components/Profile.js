import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB, fetchUserCatches } from "./firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Feather, Octicons } from "@expo/vector-icons";

const Profile = () => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const navigationProfile = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [userCatches, setUserCatches] = useState([]);

  const fetchData = async () => {
    const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      setUserInfo(userDocSnapshot.data());
    } else {
      alert("User document not found.");
    }
  };

  useEffect(() => {
    fetchData();
    const q = query(collection(FIRESTORE_DB, "users", user.uid, "catches"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const catches = [];
      snapshot.forEach((doc) => {
        catches.push(doc.data());
      });

      setUserCatches(catches);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleEditUser = () => {
    navigationProfile.navigate("EditUser", {
      userInfo,
      handleSaveChanges: (newUserName, newFirstName, newLastName) => {
        setUserInfo({
          ...userInfo,
          UserName: newUserName,
          FirstName: newFirstName,
          LastName: newLastName,
        });
      },
    });
  };

  const DisplayUsername = () => {
    if (!userInfo?.UserName) {
      return <Text>No username.</Text>;
    }
    return <Text>{userInfo?.UserName}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Profile</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.userInfo}>
          <View style={styles.profileImageContainer}>
            {!user.photoURL ? (
              <Image
                style={styles.profileImage}
                src="https://images.pexels.com/photos/2968938/pexels-photo-2968938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            ) : (
              <Image
                style={styles.profileImage}
                src={user.photoURL}
                alt="Avatar"
              />
            )}
          </View>
          <View style={styles.profileDisplayText}>
            <DisplayUsername />
            <Text>{user.email}</Text>
            <Text>
              {userInfo?.FirstName} {userInfo?.LastName}
            </Text>
          </View>
        </View>
        <View style={styles.catchesContainer}>
          <View style={styles.catchesBox}>
            <Text>Catches</Text>
            <Text>{userCatches.length}</Text>
          </View>
          <View style={styles.catchesBox}>
            <Text>Followers</Text>
            <Text>12392</Text>
          </View>
          <View style={styles.catchesBox}>
            <Text>Following</Text>
            <Text>322</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleEditUser} style={styles.editButton}>
          <Feather name="edit" size={24} color="black" />
          <Text>Edit Profile</Text>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 40,
    marginVertical: 120,
  },
  profileCard: {
    width: "80%",
    height: "40%",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 30,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImageContainer: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderRadius: 60,
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 20,
    padding: 7,
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
  searchButtonContainer: {
    width: 90,
    height: 40,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#0782F9",
    width: "100%",
    height: "100%",
    borderRadius: 55,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "500",
    fontSize: 12,
  },
  catchesContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  catchesBox: {
    width: 80,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
export default Profile;
