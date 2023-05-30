import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../Screens/MyProfile";
import EditInfo from "../Screens/EditInfo";
import UpdatePassword from "../Screens/UpdatePassword";
import MyDrawer from "../Main";
import About from "../Navigation/AboutUs"
import ContactUs from "../Navigation/ContactUs"
import Help from "../Navigation/Help"
import StartbirdingScreen from "../Screens/StartBirdingScreen";
import StartBirdingone from "../Screens/StartBirdingOne"
import UnknownBird from "../Screens/UnknownBirds"
import StartBirdingTwo from "../Screens/StartBirdingTwo";
import SubmittingBirding from "../Screens/SubmittingBirding";
import ExploreDzongkhagInfo from "../Screens/ExploreDzongkhagInfo";
import ExploreBridInfo from "../Screens/ExploreBirdInfo";
import BirdTypeInfo from "../Screens/BridTypeInfo";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MyDrawer} options={{headerShown: false}} />
      <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }}/>
      <Stack.Screen name="EditInfo" component={EditInfo} options={{ headerShown: false }}/>
      <Stack.Screen name="updateMyPassword" component={UpdatePassword} options={{ headerShown: false }}/>
      <Stack.Screen name="About" component={About} options={{headerShown: false}} />
      <Stack.Screen name="ContactUs" component={ContactUs} options={{headerShown: false}} />
      <Stack.Screen name="Help" component={Help} options={{headerShown: false}} />
      <Stack.Screen name="StartBirdingone" component={StartBirdingone}/>
      <Stack.Screen name="StartBirding" component={StartbirdingScreen} options={{headerShown: false}} />
      <Stack.Screen name="UnknownBirds" component={UnknownBird} options={{headerShown: false}} />
      <Stack.Screen name="StartBirdingTwo" component={StartBirdingTwo} />
      <Stack.Screen name="SubmittingBirding" component={SubmittingBirding} options={{headerShown: false}} />
      <Stack.Screen name="ExploreDzongkhagInfo" component={ExploreDzongkhagInfo} options={{headerShown: false}} />
      <Stack.Screen name="ExploreBridInfo" component={ExploreBridInfo} options={{headerShown: false}} />
      <Stack.Screen name="BirdTypeInfo" component={BirdTypeInfo} options={{headerShown: false}} />



    </Stack.Navigator>
  );
};
export default AppStack;
