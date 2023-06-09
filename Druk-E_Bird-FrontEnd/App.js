import React, { useEffect, useState } from "react";
import { Animated, Image, StyleSheet } from "react-native";
import { AuthProvider } from "./Context/AuthContext";
import AppNav from "./AppNavigation/AppNav";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start(() => {
      setAppReady(true);
    });
  }, []);

  if (!appReady) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Image
          source={require("./assets/Image/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: hp('10%'), 
    width: wp('100%'), 
    alignItems: 'center'
  },
});

export default App;
