import React from "react";;
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "../Screens/FirstScreen"
import SignUp from "../Screens/SignUp"
import ForgetPassword from "../Screens/ForgetPassword"
import LogIn from "../Screens/LogIn";
import Verifying from "../Screens/Verification";
import OTP from "../Screens/OTP";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Verifying" component={Verifying} options={{headerShown: false}}/>
        <Stack.Screen name="OTP" component={OTP} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};
export default AuthStack;

