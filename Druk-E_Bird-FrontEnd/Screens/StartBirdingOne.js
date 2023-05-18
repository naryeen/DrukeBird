import React, { useState, useEffect } from 'react';
import {FAB, ActivityIndicator, MD2Colors } from 'react-native-paper';
import {StyleSheet,View, FlatList, Alert, Text} from 'react-native';
import Button from '../Components/Button';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import StartBirdingCounter from '../Components/StartBirdingCounter';
import SearchSpecies from '../Components/SearchSpecies';

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const StartBirdingone = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true)
  const [seconds, setSeconds] = useState(0);
  const [count, setCount] = useState(0);
  const { StartbirdingData } = route.params;
  //console.log(data)
  // console.log(count)

  useEffect(() => {
    console.log(count)
  }, [count]);

  useEffect(() => {
    StartbirdingData
    //console.log(StartbirdingData);
  }, [StartbirdingData]);


  useEffect(() => {
    const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
}, []);

useEffect(() => {
  navigation.setOptions({
      headerLeft: () => (
          <Text style={{fontSize: 18 }}>
              {formatTime(seconds)}
          </Text>
      ),
  });
}, [navigation, seconds]);

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
        //setData(res.data.species);
        const speciesData = res.data.species.map(item => ({ ...item, count: 0 }));
        setData(speciesData);
        
      })
      .catch(error => {
        console.log('API call error')
      })
      .finally(()=> setLoading(false))
  }, []);


//Fisrt apporach
  // const renderItem = ({item}) => {
  //   return (
  //     <View>
  //       <StartBirdingCounter Name={item.englishName} count={count} setCount={setCount}></StartBirdingCounter>
  //     </View>
  //   );
  // };
///Second appoarch
  // const renderItem = ({ item }) => {
  //   const handleCountChange = (action) => {
  //     if (action === 'increase') {
  //       setCount((prevCount) => prevCount + 1);
  //     } else if (action === 'change') {
  //       setCount(0);
  //     }
  //   };
  
  //   return (
  //     <View>
  //       <StartBirdingCounter Name={item.englishName} count={count} setCount={handleCountChange} />
  //     </View>
  //   );
  // };
  const handleCountChange = (action, index) => {
    setData(prevData => {
      const updatedData = [...prevData];
      const currentItem = updatedData[index];
  
      if (action === 'increase') {
        currentItem.count += 1;
      } else if (action === 'change') {
        currentItem.count = 0;
      }
  
      return updatedData;
    });
  };

  const renderItem = ({ item, index }) => {
    // const handleCountChange = (action) => {
    //       if (action === 'increase') {
    //         setCount((prevCount) => prevCount + 1);
    //       } else if (action === 'change') {
    //         setCount(0);
    //       }
    //     };
    return (
      <View>
        <StartBirdingCounter
          Name={item.englishName}
          count={item.count}
          setCount={action => handleCountChange(action, index)}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      
      
      <SearchSpecies setData={setData}/>
      
    {loading ? (
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" style={{marginTop:250, marginBottom:250}} />
      ) : 
      (
    <FlatList style={{height:"70%", marginTop:10, borderRadius: 10}}
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
      paddingLeft:10,
      paddingRight:10
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