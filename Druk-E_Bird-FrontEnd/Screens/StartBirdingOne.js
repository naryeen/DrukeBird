import React, { useState, useEffect } from 'react';
import {FAB, ActivityIndicator, MD2Colors } from 'react-native-paper';
import {StyleSheet,View, FlatList,Alert} from 'react-native';
import Button from '../Components/Button';
import StartBirdingHeader from '../Components/StartBridingHeader';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import StartBirdingCounter from '../Components/StartBirdingCounter';
import SearchSpecies from '../Components/SearchSpecies';

const StartBirdingone = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true)

  const handleFabPress = () => {
    Alert.alert(
      'Alert ',
      'Do you want to add the unknown birds?',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => navigation.navigate('UnknownBirds')
         
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    axios.get('https://druk-ebird.onrender.com/api/v1/species?limit=40')
      .then(res => {
        setData(res.data.species);
        
      })
      .catch(error => {
        console.log(error);
        console.log('API call error')
      })
      .finally(()=> setLoading(false))
  }, []);


  const renderItem = ({item}) => {
    return (
      <View>
        <StartBirdingCounter Name={item.englishName}></StartBirdingCounter>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      
      <StartBirdingHeader/>
      <SearchSpecies setData={setData}/>
      
    {loading ? (
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" style={{marginTop:250, marginBottom:250}} />
      ) : 
      (
    <FlatList style={{height:"70%", marginTop:50}}
        data={data}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      
      )} 
      
    <FAB
    style={styles.fab}
    small
    color='white'
    icon="plus"
    onPress={handleFabPress}
    
  />
    <View style={styles.buttonContianer}>
      <Button styling={styles.submitbutton}>Submit</Button>
      <Button styling={styles.stopbutton}>Stop</Button>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:"column",
      alignItems: 'center',
      padding:10, 
      marginTop:30
    },
    
    buttonContianer:{
      flexDirection:"row",
      marginTop:10,
      
    },
    submitbutton:{
      width:163,
      marginRight:10,
      height:50,
      borderRadius:7,
    },
    stopbutton:{
      width:163,
      marginLeft:10,
      height:50,
      borderRadius:7,
    },
    fab: {
      marginLeft:290,
      marginTop:10,
      right: 0,
      bottom: 0,
      backgroundColor:"#136D66"
    },
    
  });

export default StartBirdingone;