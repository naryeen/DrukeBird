
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';


const Timer = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('BirdingScreen');
    };



    const [selectedTime, setSelectedTime] = useState(new Date());

    const handleTimeSelected = (time) => {
        setSelectedTime(time);
    };
    const [selectedDate, setSelectedDate] = useState();

    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };


    return (


        <View style={styles.container}>
            <View style={styles.Tcontainer}>
                <TimePicker onTimeSelected={handleTimeSelected} />
                <View style={styles.Tcurrent}>
                    {selectedTime && (
                        <Text style={styles.Ttext}>
                            Time: {selectedTime.toLocaleTimeString()}
                        </Text>
                    )}
                </View>

            </View>
            <View style={styles.Dcontainer}>
                <DatePicker onDateSelected={handleDateSelected} />
                <View style={styles.Dcurrent}>
                    {selectedDate && (
                        <Text style={styles.DselectedDate}>
                            Date: {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                        </Text>
                    )}
                    {!selectedDate && (
                        <Text style={styles.DselectedDate}>
                            Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                        </Text>
                    )}
                </View>
            </View>



            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.text}>Start Birding</Text>
            </TouchableOpacity>


        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 75,
        padding: 20,
        width: "100%",
        height: "60%",
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginTop: 50,
        elevation: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },



    Tcontainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        elevation: 5,
        flexDirection: "row",
        padding: 20,
        marginLeft: 15,
    },
    Tcurrent: {
        marginTop: 16,
    },
    Ttimes: {
        marginTop: 16,
    },
    Ttime: {
        marginTop: 8,
    },
    Ttext: {
        fontSize: 16,
        color: '#333',
    },
    Dcontainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        elevation: 5, // add elevation for shadow in Android
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: "center",

    },
    Dcurrent: {
        marginTop: 16,
    },
    startingButton: {
        flexDirection: 'row',
        marginTop: 25,
    },
});

export default Timer;
