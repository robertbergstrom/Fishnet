import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "./src/components/firebase.js";
import Friends from "./src/components/Friends";
import Settings from "./src/components/Settings";
import Map from "./src/components/Map";
import { Feather } from "@expo/vector-icons";
import { onAuthStateChanged } from "@firebase/auth";
import ProfileNavigator from "./src/navigation/ProfileNavigator.js";
import HomeNavigator from "./src/navigation/HomeNavigator.js";
import LoginNavigator from "./src/navigation/LoginNavigator.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Account"
            component={LoginNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
