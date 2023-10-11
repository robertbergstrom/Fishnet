import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/components/BottomTabNavigator.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/Login.js";
import { FIREBASE_AUTH } from "./src/components/firebase.js";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
