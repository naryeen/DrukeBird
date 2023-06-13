import React, { useEffect } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('./assets/Image/Logo.png')} style={styles.logo} resizeMode="contain" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    maxWidth: wp('100%'), 
    maxHeight: hp('100%'), 
    justifyContent: 'center',
  },
});

export default SplashScreen;
