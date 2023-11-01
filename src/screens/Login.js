import {
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../components/firebase";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("SignUp");
    console.log("Navigating to SignUp");
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Successfully logged in.");
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/fishnet-348012.appspot.com/o/FishnetBackground.png?alt=media&token=e8a49298-8460-4b5c-9ec2-2b7f438f0445&_gl=1*1sm88r6*_ga*MTEwMzY2NDk1NC4xNjk2NTgyOTgy*_ga_CW55HF8NVT*MTY5ODc0NzI4NS41Mi4xLjE2OTg3NDczMjcuMTguMC4w"
        style={styles.backgroundImage}
      />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar style="auto" />
        <Text style={styles.logoText}>Fishnet</Text>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Feather name="mail" size={24} color="grey" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.input}>
            <Feather name="key" size={24} color="grey" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={signIn} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text>No Account? Create one below</Text>
              <TouchableOpacity
                onPress={handleRegister}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#349eff",
  },
  inputContainer: {
    width: "60%",
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2142A9",
    flexDirection: "row",
    gap: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderWidth: 2,
    borderColor: "#2142A9",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  logoText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
