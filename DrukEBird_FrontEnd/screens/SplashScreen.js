import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, Image, ToastAndroid} from 'react-native';
import Button from '../components/Button';
import Toast from 'react-native-simple-toast';

function SplashScreen () { 

  const showToast = () => {

    Toast.showWithGravity('This is a long toast at the top.', Toast.LONG, Toast.TOP);

  };
  
  const navigation = useNavigation();
  const navigateHandler = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/logo.png')} />
      
      <Text style={styles.text1}>Welcome to <Text style={{color: "#136D66", fontWeight:"bold"}}>Druk eBird</Text> , your gateway</Text>
      <Text style={styles.text2}>to the fascinating world of birds and</Text>
      <Text style={styles.text2}>birding!</Text>
      <View style={styles.buttonview}>
      {/* <Button onPress = {navigateHandler}> */}
      <Button onPress={() => showToast()}>
        Get Started  
      </Button>
      </View>
    </View>
  );
}
export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1:{
    marginTop: 120,
    fontSize:18
  },
  text2:{
    fontSize:18
  },
  image:{
    maxWidth:'60%',
    maxHeight:230,
    justifyContent: "center",
    
  },
  buttonview:{
    marginTop:150
  }
  
});
