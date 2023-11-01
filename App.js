import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "./src/components/firebase.js";
import { onAuthStateChanged } from "@firebase/auth";
import LoginNavigator from "./src/navigation/LoginNavigator.js";
import { BottomTabNavigator } from "./src/navigation/BottomTabNavigator.js";

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
