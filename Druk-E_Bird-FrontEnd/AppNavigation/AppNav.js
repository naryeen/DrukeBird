import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";
import { RootSiblingParent } from 'react-native-root-siblings';
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
       <RootSiblingParent>
      {userToken !== null ? <AppStack /> : <AuthStack />}
      </RootSiblingParent>
    </NavigationContainer>
  );
  
};
export default AppNav;
