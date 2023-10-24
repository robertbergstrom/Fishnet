import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const LoginStack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginNavigator;
