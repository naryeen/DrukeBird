import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Button from '../Components/Button';

function FirstScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const navigateHandler = () => {
    navigation.navigate('Login');
  };

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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
    alignItems: 'center', 
  },
});

export default FirstScreen;