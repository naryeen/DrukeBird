import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, Image} from 'react-native';
import Button from '../Components/Button';

function FirstScreen () { 
  const navigation = useNavigation();
  const navigateHandler = () => {
    navigation.navigate('LogIn')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Image/Logo.png')} />
      
      <Text style={styles.text1}>Welcome to <Text style={{color: "#136D66", fontWeight:"bold"}}>Druk eBird</Text> , your gateway</Text>
      <Text style={styles.text2}>to the fascinating world of birds and</Text>
      <Text style={styles.text2}>birding!</Text>
      <View style={styles.buttonview}>
      <Button onPress = {navigateHandler}>
        Get Started  
      </Button>
      </View>
    </View>
  );
}

// const { width, height } = useWindowDimensions()
// const marginTopDistance = height < 380 ? 30 : 100 

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
export default FirstScreen;
