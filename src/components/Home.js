import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function FishList() {
  const [fishData, setFishData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetchFishData();
  }, []);

  const fetchFishData = async () => {
    try {
      let apiUrl = "https://fish-species.p.rapidapi.com/fish_api/fishes";

      // If a search term is provided, modify the API URL accordingly
      if (searchTerm) {
        apiUrl = `https://fish-species.p.rapidapi.com/fish_api/fish/${encodeURIComponent(
          searchTerm
        )}`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "0ad49bcb6bmshdaf367c5a5ebd11p11245bjsn823c5fc73385",
          "X-RapidAPI-Host": "fish-species.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFishData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderFishItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <View style={{ padding: 16 }}>
          <Text>{item.name}</Text>
          <Feather name="external-link" size={24} color="black" />
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = async () => {
    await fetchFishData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarInputContainer}>
          <TextInput
            placeholder="Search by fish name"
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
      <FlatList
        data={fishData}
        renderItem={renderFishItem}
        keyExtractor={(item) => item.id.toString()} // Replace 'id' with the actual unique key property
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBarInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20, // Rounded corners for the left side of the search bar
    overflow: "hidden", // Clip content outside the border
  },
  searchBarInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  listItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
  },
  searchBarButton: {
    padding: 10,
    borderRadius: 20, // Rounded corners for the button
  },
});
