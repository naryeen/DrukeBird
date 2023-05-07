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
import LogIn from './screens/Login';

const Stack = createStackNavigator();

export default function App() {
   return (
      <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Login" component={LogIn} options={{headerShown: false}}/>
         <Stack.Screen name="MyProfile" component={MyProfile} options={{headerShown: false}} />
         <Stack.Screen name="EditInfo" component={EditInfo} options={{headerShown: false}} />
         <Stack.Screen name="updateMyPassword" component={UpdatePassword} options={{headerShown: false}} />
      </Stack.Navigator>
      </NavigationContainer>
   );
};