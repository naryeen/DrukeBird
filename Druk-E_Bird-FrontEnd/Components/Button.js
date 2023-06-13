import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  buttontext: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp('2.08%'), // Adjust the percentage value as needed
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#136D66',
    padding: wp('4.17%'), // Adjust the percentage value as needed
    width: wp('96%'),
    borderRadius: wp('2.08%'), // Adjust the percentage value as needed
  },
});
export default Button