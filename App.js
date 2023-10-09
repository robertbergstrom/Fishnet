import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/components/BottomTabNavigator.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/Login.js";
import Profile from "./src/components/Profile.js";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <BottomTabNavigator />
    // </NavigationContainer>
  );
};

export default App;
