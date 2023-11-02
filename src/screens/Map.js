import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps"; // Import map-related components
import { getAllUsersAndCatches } from "../components/firebase";

function Map() {
  const [catches, setCatches] = useState([]);

  useEffect(() => {
    async function fetchCatches() {
      try {
        const combinedData = await getAllUsersAndCatches();
        const catchesWithLocation = combinedData.filter(
          (item) => item.catchData.Location
        );

        setCatches(catchesWithLocation);
      } catch (error) {
        console.error("Error fetching catch data:", error);
      }
    }

    fetchCatches();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 58.282526,
          longitude: 12.29238,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {catches.map((item) => (
          <Marker key={item.catchId} coordinate={item.catchData.Location} />
        ))}
      </MapView>
    </View>
  );
}

export default Map;
