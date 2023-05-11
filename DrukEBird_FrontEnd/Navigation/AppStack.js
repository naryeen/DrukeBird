import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyProfile from "../screens/MyProfile";
import EditInfo from "../screens/EditInfo";
import UpdatePassword from "../screens/UpdatePassword";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditInfo"
        component={EditInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="updateMyPassword"
        component={UpdatePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
