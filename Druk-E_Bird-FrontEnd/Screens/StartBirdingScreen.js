import { useNavigation } from '@react-navigation/native';
import {StyleSheet,View} from 'react-native';
import Button from '../Components/Button';

function StartbirdingScreen () { 
  const navigation = useNavigation();
  const navigateHandler = () => {
    navigation.navigate('StartBirdingone')
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonview}>
      <Button onPress = {navigateHandler}>
       StartBirding 
      </Button>
      </View>
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
  buttonview:{
    marginTop:150
  }
  
});
export default StartbirdingScreen;
