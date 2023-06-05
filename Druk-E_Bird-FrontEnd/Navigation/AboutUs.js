import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import NavigationHeader from "../Components/NavigationHeader";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


function About() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <NavigationHeader title={"About"} />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Image
          source={require("../assets/Image/Logo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.descriptionText}>
          Welcome to DrukeBird, an extraordinary app designed to connect bird enthusiasts and contribute to the world of avian research. Managed by the Royal Society for Protection of Nature (RSPN), DrukeBird is Bhutan's premier platform for recording and sharing bird sightings, supporting research, and fostering a community of passionate birdwatchers.

          {"\n\n"}

          DrukeBird is inspired by the global eBird initiative and its success in engaging birders worldwide. Our aim is to bring that same level of enthusiasm and scientific collaboration to the beautiful landscapes of Bhutan.

          {"\n\n"}

          By using DrukeBird, you become an invaluable contributor to our understanding of the country's avifauna. Our app empowers birdwatchers of all levels to effortlessly submit checklists of their bird sightings. Documenting the species, location, date, and additional observations allows us to create a comprehensive and ever-growing database of Bhutan's avian biodiversity.

          {"\n\n"}

          As part of the RSPN, DrukeBird is dedicated to the conservation and protection of Bhutan's natural heritage. By using this app, you contribute directly to the conservation efforts and scientific research that play a pivotal role in safeguarding our avifauna for future generations. Join us on this incredible journey of discovery, conservation, and community. Together, let's celebrate the diversity of Bhutan's birds, deepen our understanding, and contribute to the global knowledge base of avian science.

          {"\n\n"}

          Thank you for being a part of DrukeBird.
        </Text>
      </ScrollView>
      </SafeAreaView>
      <StatusBar />
    </View>
  );
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  logoImage: {
    width: wp('90%'),
    height: wp('50%'),
    marginLeft: wp('7%'),
    resizeMode: "contain",
  },
  descriptionText: {
    width: wp('90%'),
    marginLeft: wp('5%'),
    fontSize: wp('4%'),
    textAlign: "justify",
    lineHeight: hp(3), // Adjust this value as needed for your design
  },
});