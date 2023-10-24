import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import Fishfacts from "../components/Fishfacts";
import AddCatchScreen from "../components/AddCatchScreen";

const HomeStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="FishfactsScreen"
        component={Fishfacts}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="AddCatchScreen" component={AddCatchScreen} />
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
