import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../components/Profile";
import EditUser from "../components/EditUser";

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
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
