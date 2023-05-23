import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Headers(){
    return(
        <View style={styles.header}>
            <Text style={styles.text}>Help</Text>           
        </View>

    );
}
const styles=StyleSheet.create({
    header:{
        height: 70,
        paddingTop: 40,
        backgroundColor:'#ffff',

    },
    text: {
        color:'#136D66',
        fontSize:24,
        textAlign: 'center',
    },

});