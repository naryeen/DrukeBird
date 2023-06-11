import React from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";

import image1 from "../assets/Image/image1.png";
import image2 from "../assets/Image/image2.png";
import image3 from "../assets/Image/image3.png";
import { SliderBox } from "react-native-image-slider-box";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const images = [image1, image2, image3];

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
          <Text style={styles.baseText}>with</Text>
          <Text style={styles.innerText}> DrukeBird</Text>
          <Text style={styles.innerText1}>
            {" "}
            The ultimate tool for anyone who
          </Text>
          <Text style={styles.baseText}> loves birds and nature</Text>
        </View>
        <Button
          styling={styles.buttonStyle}
          onPress={() => navigation.navigate("Help")}
        >
          How it works {">>"}
        </Button>
      </SafeAreaView>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("0.9%"),
  },
  image: {
    height: hp("35%"),
    resizeMode: "contain",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("8%"),
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  highlight: {
    color: "#136d66",
    fontWeight: "bold",
    fontSize: wp("5%"),
    marginBottom: hp("2%")
  },
  innerText: {
    color: "#136d66",
    fontWeight: "bold",
    fontSize: wp("5%"),
    
  },
  innerText1: {
    fontWeight: "bold",
    fontSize: wp("4.3%"),
    paddingTop: hp("5%"),
    
  },
  baseText: {
    fontWeight: "bold",
    fontSize: wp("4.3%"),
    marginBottom: hp("2%")

  },
  buttonStyle: {
    marginTop: hp("5%"),
    width: wp("95%"),
  },
});

export default HomeScreen;