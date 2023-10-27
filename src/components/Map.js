import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { doc, getDocs, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const locationsArray = [];

    const querySnapshot = await getDocs(
      collection(FIRESTORE_DB, "users", doc.name, "catches")
    );
    querySnapshot.forEach((doc) => {
      const catchData = doc.data();
      if (
        catchData.Location &&
        catchData.Location.latitude &&
        catchData.Location.longitude
      ) {
        // Check if location data exists
        locationsArray.push(catchData.Location);
      }
    });

    setLocations(locationsArray);
  };

  const renderLocationItem = ({ item, index }) => (
    <View
      style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text>Location {index + 1}</Text>
      <Text>Latitude: {item.latitude}</Text>
      <Text>Longitude: {item.longitude}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        {/* {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        ))} */}
        <FlatList
          data={locations}
          renderItem={renderLocationItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </MapView>
    </View>
  );
};

export default Map;
