import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headingText}>For you</Text>
    </View>
  );
};

export default HomeHeader;

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
});
