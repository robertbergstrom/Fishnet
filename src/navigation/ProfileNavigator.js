import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import EditUser from "../screens/EditUser";
import HandleCatchScreen from "../screens/HandleCatchScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name="EditUser" component={EditUser} />
      <ProfileStack.Screen
        name="HandleCatchScreen"
        component={HandleCatchScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
