import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Friends from "../screens/Friends";
import Settings from "../screens/Settings";
import Map from "../screens/Map";
import { Feather } from "@expo/vector-icons";
import ProfileNavigator from "./ProfileNavigator.js";
import HomeNavigator from "./HomeNavigator.js";

const Tab = createBottomTabNavigator();
export function BottomTabNavigator() {
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
