import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import UnknownBird from "../screens/UnknownBirds";
import BhutanLocationSelector from "../screens/Location";

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
      {/* {userToken !== null ? <AppStack /> : <AuthStack />} */}
      {/* <UnknownBird/> */}
      <BhutanLocationSelector/>
    </NavigationContainer>
  );
  
};
export default AppNav;
