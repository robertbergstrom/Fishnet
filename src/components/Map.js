// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   StyleSheet,
//   KeyboardAvoidingView,
//   TouchableOpacity,
// } from "react-native";
// import MapView, { Polyline, Marker } from "react-native-maps";
// import axios from "axios";
// import { Feather } from "@expo/vector-icons";

// function Map() {
//   const [startLocation, setStartLocation] = useState("");
//   const [endLocation, setEndLocation] = useState("");
//   const [route, setRoute] = useState([]);
//   const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
//   const [startCoordinates, setStartCoordinates] = useState(null);
//   const [endCoordinates, setEndCoordinates] = useState(null);
//   const [searchBarOpacity, setSearchBarOpacity] = useState(0.5);

//   const handleSearch = async () => {
//     const apiKey = "5b3ce3597851110001cf6248a98dbd84f5af43028e141b91b5ee4f2f";

//     try {
//       const response = await axios.get(
//         `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLocation}&end=${endLocation}`
//       );

//       const directions = response.data;
//       if (directions.features.length > 0) {
//         setRoute(directions.features[0].geometry.coordinates);
//         setIsSearchSubmitted(true);

//         // Set the coordinates for the starting and ending locations
//         setStartCoordinates(directions.features[0].geometry.coordinates[0]);
//         setEndCoordinates(
//           directions.features[0].geometry.coordinates[
//             directions.features[0].geometry.coordinates.length - 1
//           ]
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching directions:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView style={{ flex: isSearchSubmitted ? 0.7 : 1 }}>
//         {route.length > 0 && (
//           <Polyline coordinates={route} strokeWidth={4} strokeColor="#ff0000" />
//         )}
//         {startCoordinates && (
//           <Marker
//             coordinate={{
//               latitude: startCoordinates[1],
//               longitude: startCoordinates[0],
//             }}
//             title="Start"
//           />
//         )}
//         {endCoordinates && (
//           <Marker
//             coordinate={{
//               latitude: endCoordinates[1],
//               longitude: endCoordinates[0],
//             }}
//             title="End"
//           />
//         )}
//       </MapView>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.searchBar}
//       >
//         <TextInput
//           style={styles.input}
//           placeholder="Start Location"
//           value={startLocation}
//           onChangeText={setStartLocation}
//         />
//         <Feather name="arrow-right" size={16} color="black" />
//         <TextInput
//           style={styles.input}
//           placeholder="End Location"
//           value={endLocation}
//           onChangeText={setEndLocation}
//         />
//         <TouchableOpacity onPress={handleSearch} style={styles.searchBarButton}>
//           <Feather name="search" size={20} color="#333" />
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// export default Map;

// const styles = StyleSheet.create({
//   searchBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//     right: 10,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   input: {
//     flex: 1,
//     marginRight: 10,
//   },
// });

import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function App() {
  const [response, setResponse] = useState(null);
  const [apiKey, setApiKey] = useState(
    "5b3ce3597851110001cf6248a98dbd84f5af43028e141b91b5ee4f2f"
  );
  const [category, setCategory] = useState("fishing");

  const sendRequest = async () => {
    const url = "https://api.openrouteservice.org/pois";

    try {
      const requestBody = {
        request: "pois",
        geometry: {
          bbox: [8.681423, 49.414599, 8.690123, 49.420514],
        },
        filters: {
          category_group_ids: [category],
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        setResponse("Error: Unable to fetch data");
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>OpenRouteService POIs API</Text>
      <TextInput
        style={styles.input}
        placeholder="API Key"
        value={apiKey}
        onChangeText={setApiKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., healthcare)"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Send Request" onPress={sendRequest} />
      {response && <Text style={styles.response}>{response}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  response: {
    fontSize: 14,
    marginTop: 16,
    fontFamily: "monospace",
  },
});
