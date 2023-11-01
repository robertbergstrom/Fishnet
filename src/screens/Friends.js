import React from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

const Friends = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar style="auto" />
      <Text>Friends</Text>
    </View>
  );
};

export default Friends;
