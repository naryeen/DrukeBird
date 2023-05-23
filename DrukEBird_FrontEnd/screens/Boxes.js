import React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
// import DateTimePickerModal from '@react-native-modal-datetime-picker';


export default class Boxes extends React.Component {


    render() {


        return (
            <View style={styles.container}>

                <View style={styles.box}>
                    <View style={styles.inner}>
                        <Text>Hello</Text>
                    </View>


                </View>


                <View style={styles.box}>
                    <View style={styles.inner}>
                        <Text>I am date</Text>
                    </View>

                </View>
                <View style={styles.box}>
                    <View style={styles.inner}>
                        <Text> Box 2 </Text>
                    </View>

                </View>





                <TouchableOpacity onPress={() => alert('Button pressed')}>
                    <View style={{
                        backgroundColor: '#136d66',
                        width: '90%',
                        padding: 10,
                        position: 'absolute',
                        marginTop: 50,
                        marginLeft: 20,
                        marginBottom: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ color: 'white' }}>Start CheckList </Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '90%',
        padding: 5,
        flexDirection: 'column',
        flexWrap: 'wrap'

    },
    box: {
        width: '100%',
        height: '30%',
        backgroundColor: '#eee',
        padding: 10,
        elevation: 55,
    },
    inner: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    date: {
        fontSize: 20,
        fontWeight: 'bold'
    },

});


