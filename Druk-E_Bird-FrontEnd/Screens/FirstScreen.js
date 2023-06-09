import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Components/Button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

function FirstScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.back()),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityValue, translateYValue]);

  const navigateHandler = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.image, { opacity: opacityValue, transform: [{ translateY: translateYValue }] }]}
        source={require('../assets/Image/Logo.png')}
      />

      <Animated.Text style={[styles.text1, { opacity: opacityValue }]}>
        Welcome to <Text style={{ color: '#136D66', fontWeight: 'bold' }}>DrukeBird</Text>, your gateway
      </Animated.Text>
      <Animated.Text style={[styles.text2, { opacity: opacityValue }]}>to the fascinating world of birds and</Animated.Text>
      <Animated.Text style={[styles.text2, { opacity: opacityValue }]}>birding!</Animated.Text>
      <Animated.View style={[styles.buttonview, { opacity: opacityValue }]}>
        <Button onPress={navigateHandler}>Get Started</Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    marginTop: hp('10%'), 
    fontSize: hp('2.5%'),
  },
  text2: {
    fontSize: hp('2.5%'), 
  },
  image: {
    maxWidth: wp('70%'), 
    maxHeight: hp('30%'), 
    justifyContent: 'center',
  },
  buttonview: {
    marginTop: hp('20%'), 
    width: wp('100%'), 
    alignItems: 'center'
  },
});

export default FirstScreen;
