import React from "react";
import { View, Text, Button } from "react-native";
import { FIREBASE_AUTH } from "./firebase";

const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>
      <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  );
};

export default Settings;
