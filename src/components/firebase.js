import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  updateProfile,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7L2oaiuNB6iIML6DibX2jkUNTgDpGexU",
  authDomain: "fishnet-348012.firebaseapp.com",
  projectId: "fishnet-348012",
  storageBucket: "fishnet-348012.appspot.com",
  messagingSenderId: "152462436663",
  appId: "1:152462436663:web:20b92f092c5d0334f692b2",
  measurementId: "G-RGVEE8D4QF",
};

// Initialize Firebase
// export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
let FIREBASE_APP, FIREBASE_AUTH;

if (!getApps().length) {
  try {
    FIREBASE_APP = initializeApp(firebaseConfig);
    FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  FIREBASE_APP = getApp();
  FIREBASE_AUTH = getAuth(FIREBASE_APP);
}
export { FIREBASE_APP, FIREBASE_AUTH };
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

// Storage functionality
export async function upload(file, user, setLoading) {
  const imagesRef = ref(FIREBASE_STORAGE, "images/" + user.uid + ".png");
  await uploadBytes(imagesRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    alert("Image uploaded successfully.");
  });
  const imageURL = await getDownloadURL(imagesRef);
  const auth = getAuth();
  try {
    // updateProfile(user, { photoURL: imageURL });
    updateProfile(auth.currentUser, {
      photoURL: imageURL,
    });
    alert("Profile updated successfully.");
  } catch (error) {
    // Handle any errors here
    console.error("Error updating profile: ", error);
  }
}

// Function to add a new catch to Firestore
export async function addCatchToFirestore(catchData) {
  try {
    const catchRef = await setDoc(doc(FIRESTORE_DB, "catches"), catchData);
    return catchRef.id;
  } catch (error) {
    console.error("Error adding catch: ", error);
    return null;
  }
}

// Function to upload a catch image to Firebase Storage
export async function uploadCatchImage(userId, imageUri) {
  const storageRef = ref(
    FIREBASE_STORAGE,
    `catches/${userId}/${Date.now()}.png`
  );

  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob);

    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
}

// Function to get catches from Firestore associated with a user
export async function getCatchesFromFirestore(userId) {
  const querySnapshot = await getDocs(
    query(collection(FIRESTORE_DB, "catches"), where("UserId", "==", userId))
  );

  const catches = [];
  querySnapshot.forEach((doc) => {
    const catchData = doc.data();
    catches.push({ id: doc.id, ...catchData });
  });

  return catches;
}
