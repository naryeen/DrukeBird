import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './Screens/FirstScreen';
import SignUp from './Screens/SignUp';
import LogIn from './Screens/LogIn';
import MyDrawer from './Main';
import ForgetPassword from './Screens/ForgetPassword';
import About from './Navigation/AboutUs';
import ContactUs from './Navigation/ContactUs';
import Setting from './Navigation/Setting';
import Help from './Navigation/Help';
import StartBirdingone from './Screens/StartBirdingOne';
import StartbirdingScreen from './Screens/StartBirdingScreen';
import UnknownBird from './Screens/UnknownBirds';



const Stack = createStackNavigator();


const MainStack = () => {
   return (
      <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown: false}}/>
         <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
         <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
         <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown: false}}/>
         <Stack.Screen name="MainScreen" component={MyDrawer} options={{headerShown: false}} />
         <Stack.Screen name="About" component={About} options={{headerShown: false}} />
         <Stack.Screen name="ContactUs" component={ContactUs} options={{headerShown: false}} />
         <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}} />
         <Stack.Screen name="Help" component={Help} options={{headerShown: false}} />
         <Stack.Screen name="StartBirdingone" component={StartBirdingone}/>
         <Stack.Screen name="StartBirding" component={StartbirdingScreen} options={{headerShown: false}} />
         <Stack.Screen name="UnknownBirds" component={UnknownBird} options={{headerShown: false}} />
      </Stack.Navigator>
      </NavigationContainer>
   );
};


export default MainStack;