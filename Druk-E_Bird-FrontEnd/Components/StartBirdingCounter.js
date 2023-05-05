import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const StartBirdingCounter = ({Name}) => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Button style={styles.plusButton} icon="plus-box-outline"  onPress={() => setCount(count + 1)}/>
      <Text style={styles.countText}>{count}</Text>
      <Text style={styles.speciesText}>{Name}</Text>
      <Button style={styles.minusButton} icon="minus-box-outline" onPress={() => setCount(count - 1)}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
        flexDirection: "row",
        borderWidth:1,
        width:"100%",
        marginTop:10
    },
    plusButton:{
        marginStart:0
    },
    minusButton:{
        alignSelf:"flex-start"
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