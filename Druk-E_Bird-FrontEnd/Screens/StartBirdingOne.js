import React, { useState, useEffect } from 'react';
import { Searchbar, FAB, ActivityIndicator, MD2Colors } from 'react-native-paper';
import {StyleSheet,View, FlatList} from 'react-native';
import Button from '../Components/Button';
import StartBirdingHeader from '../Components/StartBridingHeader';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import StartBirdingCounter from '../Components/StartBirdingCounter';

const StartBirdingone = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true)


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
      
      <StartBirdingHeader stylings={styles.header} />
      <Searchbar
        placeholder="Search any birds"
        onChangeText={onChangeSearch}
        inputStyle={{ paddingBottom:19}}
        placeholderTextColor="gray"
        value={searchQuery}
        style={styles.searchbar}
      />
      
    {loading ? (
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" style={{marginTop:250, marginBottom:250}} />
      ) : 
      (
    <FlatList style={{height:"70%"}}
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
    onPress={() => navigation.navigate('UnknownBirds')}
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
      backgroundColor: '#fff',
      alignItems: 'center',
      padding:10, 
    },
    
    searchbar:{
        marginTop:5,
        height:40,
        borderRadius:10,
        backgroundColor:"white",
        borderColor:"black",
        borderWidth:1
    },
    header:{
        width:370,
        height:50,
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
      marginLeft:330,
      marginTop:10,
      right: 0,
      bottom: 0,
      backgroundColor:"#136D66"
    },
    
  });

export default StartBirdingone;