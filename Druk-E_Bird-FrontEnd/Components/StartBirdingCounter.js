import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const StartBirdingCounter = ({Name}) => {
  const [count, setCount] = useState(0);

  
  function countIt(){
    if(!!count){
      setCount(count-1)
    } 
  }

  return (
    <View style={styles.container}>
      <Button icon="plus-box-outline"  onPress={() => setCount(count + 1)}/>
      <Text style={styles.countText}>{count}</Text>
      <Text style={styles.speciesText}>{Name}</Text>
      <Button icon="minus-box-outline" onPress={() => countIt()}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
        flexDirection: "row",
        justifyContent: 'space-between',
        borderWidth:1,
        marginTop:10
    },
    countText:{
        marginTop:10,
        fontWeight:"bold"
    },
    speciesText:{
        marginTop:7,
        marginLeft:20,
        fontSize:16
    }
});

export default StartBirdingCounter;