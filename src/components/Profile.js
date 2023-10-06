import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const url = "https://www.fruityvice.com/api/fruit/all";
const FruitsScreen = () => {
  const [fruits, setFruits] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setFruits(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const toggleColumns = () => {
    setNumColumns(numColumns === 2 ? 1 : 2);
  };

  const renderItem = ({ item }) => {
    // Create a two-column layout
    return (
      <View style={styles.fruitItem}>
        <View style={styles.leftColumn}>
          <Text style={styles.fruitName}>Name: {item.name}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.fruitFamily}>Family: {item.family}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text style={styles.listHeader}>Name</Text>
        <Text style={styles.listHeader}>Family</Text>
      </View>
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fruitItem: {
    display: "flex",
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Center items vertically
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    paddingBottom: 10,
    borderColor: "#aaa",
    borderRadius: 5,
    borderBottomWidth: 0.5,
  },
  listHeader: {
    fontSize: 20,
    marginTop: 10,
  },
  leftColumn: {
    flex: 1,
    padding: 10,
  },
  rightColumn: {
    flex: 1,
    padding: 10,
  },
});

export default FruitsScreen;
