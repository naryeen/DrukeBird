import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

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
      padding: 15,
      width:380,
      borderRadius:10
    }
  });

export default Button