import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import Friends from "./Friends";
import Settings from "./Settings";
import Map from "./Map";
import { Feather } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "./firebase";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const auth = FIREBASE_AUTH;
  const handleSignOut = () => {
    // firebase.auth().signOut();
    auth.signOut();
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={() => <Settings onSignOut={handleSignOut} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
