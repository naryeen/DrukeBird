import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native';
import image1 from '../assets/Image/image1.png';
import image2 from '../assets/Image/image2.png';
import image3 from '../assets/Image/image3.png';
import { SliderBox } from 'react-native-image-slider-box';
import Button from "../Components/Button";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const images = [
    image1,
    image2,
    image3,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.im}>
        <SliderBox
          images={images}
          ImageComponentStyle={styles.image}
          dotColor="red"
          inactiveDotColor="black"
          dotStyle={{ height: 10, width: 10, borderRadius: 50 }}
          imageLoadingColor="black"
          autoplay
          autoplayTimeout={10000}
          loop
          autoplayInterval={9000}
          CircleLoop={true}
        />
      </View>

      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.centeredContainer}>
          <Text style={styles.highlight}>Discover, learn & connect</Text>
          <Text style={styles.baseText}>
            with
            <Text style={styles.innerText}> DrukeBird</Text>
          </Text>
          <Text style={styles.innerText1}> The ultimate tool for anyone who</Text>
          <Text style={styles.baseText}> loves birds and nature</Text>
        </View>
        <Button
          styling={styles.buttonStyle}
          onPress={() => navigation.navigate('Help')}
        >
          How it works {'>>'}
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.009,
  },
  image: {
    height: height * 0.35, // Adjust the height of the image
    resizeMode: 'contain', // Adjust the resizeMode if needed
  },
  contentContainer: {
    paddingTop: height * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: {
    color: '#136d66',
    fontWeight: 'bold',
    fontSize: width * 0.05,
    marginBottom: height * 0.02,
  },
  innerText: {
    color: '#136d66',
    fontWeight: 'bold',
    fontSize: width * 0.05,
  },
  innerText1: {
    marginTop:30,
    fontWeight: 'bold',
    fontSize: width * 0.04,
    paddingTop: height * 0.02,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  buttonStyle: {
    marginTop: height * 0.08,
    width: width * 0.95,
  },
});

export default HomeScreen;