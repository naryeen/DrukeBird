import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import NavigationHeader from '../Components/NavigationHeader';

const { width, height } = Dimensions.get('window');

function About() {
  return (
    <View style={styles.container}>
      <NavigationHeader title={'About'} />
      <Image
        source={require('../assets/Image/Logo.png')}
        style={styles.logoImage}
      />
      <Text style={styles.descriptionText}>
        Druk EBird is managed by the Royal Society for Protection of Nature on
        behalf of birding, research, and conservation communication to provide
        rich and rapidly growing database of bird sighting.
        {'\n'}
        {'\n'}
        Druk EBird documents the bird distribution, abundance, and trends
        through checklist data collected within a simple, scientific framework.
        {'\n'}
        {'\n'}
        In addition to providing a space for birdwatchers to share their
        observations, Druk Ebird can be also used by the researchers to study
        about the bird population, distribution and existence.
        {'\n'}
        {'\n'}
        Overall, it is a powerful application for researchers, birdwatchers,
        providing a platform for users and contributing to our understanding of
        birds and their conservation.
      </Text>
      <StatusBar />
    </View>
  );
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    width: width * 0.9,
    height: width * 0.5,
    marginLeft: width * 0.1,
    marginTop: height * 0.03,
    resizeMode: 'contain',
  },
  descriptionText: {
    width: width * 0.9,
    marginLeft: width * 0.05,
    marginTop: height * 0.06,
    fontSize: width * 0.04, 
  },
});