import React, {useState, Component} from "react";
import { Settings } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import {Setting} from './Screen/Setting';
import { ButtonGroup } from "./Screen/Setting";
import ContactUs from "./Screen/Contact";
import { About } from "./Screen/About";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MyDrawer} from "./Screen/MyDrawer";

const Stack = createStackNavigator();

function App() {
  // const printButtonLabel = (item) => {
  //   console.log(item)
  // }
  // const printButtonLabel1 = (item1) => {
  //   console.log(item1)
  // }
  return(
    <SafeAreaView style={{flex: 1}}>
      {/* <Setting/>
      <View>
      <ButtonGroup
        buttons={[1,2,3,4,5]}
        buttons1={[1,2,3,4,5]}
        doSomethingAfterClick={printButtonLabel}
        doSomethingAfterClick1={printButtonLabel1}
      />
      </View> */}
      {/* </About/> */}
      {/* <ContactUs/> */}
      <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="MainScreen" component={MyDrawer} options={{headerShown: false}} />
         <Stack.Screen name="About" component={About} options={{headerShown: false}} />
         <Stack.Screen name="ContactUs" component={ContactUs} options={{headerShown: false}} />
         <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}} />
         
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
    
}
export default App;
