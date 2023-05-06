import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./screens/SplashScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import MyProfile from './screens/MyProfile';
import EditInfo from './screens/EditInfo';
import UpdatePassword from './screens/UpdatePassword';
import StartBirdingCounter from './screens/dummy';

const Stack = createStackNavigator();

export default function App() {
   return (
      <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="My Profile" component={MyProfile} options={{headerShown: false}} />
         <Stack.Screen name="EditInfo" component={EditInfo} options={{headerShown: false}} />
         <Stack.Screen name="updateMyPassword" component={UpdatePassword} options={{headerShown: false}} />
      </Stack.Navigator>
      </NavigationContainer>
   );
};