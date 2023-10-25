import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import Fishfacts from "../components/Fishfacts";
import AddCatchScreen from "../components/AddCatchScreen";
import Explore from "../components/Explore";

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
