import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Fishfacts from "../screens/Fishfacts";
import AddCatchScreen from "../screens/AddCatchScreen";
import Explore from "../screens/Explore";

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
      <HomeStack.Screen
        name="AddCatchScreen"
        component={AddCatchScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ExploreScreen"
        component={Explore}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
