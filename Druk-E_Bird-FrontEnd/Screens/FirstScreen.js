import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Button from '../Components/Button';

function FirstScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const navigateHandler = () => {
    navigation.navigate('Login');
  };

  const marginTopDistance = height < 300 ? 30 : 50;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1: {
      marginTop: marginTopDistance,
      fontSize: 18,
    },
    text2: {
      fontSize: 18,
    },
    image: {
      maxWidth: width * 0.7,
      maxHeight: height * 0.3,
      justifyContent: 'center',
    },
    buttonview: {
      marginTop: height * 0.2,
      width: "100%",
      alignContent: "center",
      marginLeft: "4%"
    },
  });

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Image/Logo.png')} />

      <Text style={styles.text1}>
        Welcome to <Text style={{ color: '#136D66', fontWeight: 'bold' }}>DrukeBird</Text>, your gateway
      </Text>
      <Text style={styles.text2}>to the fascinating world of birds and</Text>
      <Text style={styles.text2}>birding!</Text>
      <View style={styles.buttonview}>
        <Button onPress={navigateHandler}>Get Started</Button>
      </View>
    </View>
  );
}

export default FirstScreen;