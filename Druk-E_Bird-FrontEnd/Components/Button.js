import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');


function Button({children, onPress,styling}){


  return (
    <View>
        <TouchableOpacity style={[styles.button, styling]} onPress={onPress}>
            <Text style={styles.buttontext}>{children}</Text>
        </TouchableOpacity> 
    </View> 
  )
}

const styles = StyleSheet.create({
  buttontext:{
    color: "white", 
    fontWeight:"bold",
    fontSize:16

  },
    button:{
      alignItems: 'center',
      backgroundColor: '#136D66',
      padding: width*0.04,
      width:"96%",
      borderRadius:10
    }
  });

export default Button