// Settings.js
import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Settings = ({ onSignOut }) => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    onSignOut();
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Settings;
