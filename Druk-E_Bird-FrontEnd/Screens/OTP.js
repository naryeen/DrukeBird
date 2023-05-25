import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from "../Components/Button";
import axios from "axios";

const OTP = () => {
  const navigation = useNavigation();
  const [OTP, setOTP] = useState("");
  const windowDimensions = Dimensions.get('window');

  const marginTopDistance = windowDimensions.height < 380 ? 30 : 60;

  const verifyOTP = () => {
    let verifyOTPdata = {
      otp:OTP
    };
    axios
      .post('https://druk-ebirds.onrender.com/api/v1/users/OTP', verifyOTPdata)
      .then(res => {
        if (res.data.status == "success") {
          ToastAndroid.show('OTP matched',
            ToastAndroid.LONG);

          setTimeout(() => {
            navigation.navigate('SignUp');
          }, 200);
        }
      })
      .catch(err => {
        JSON.stringify(err);
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;

        ToastAndroid.show(message,
          ToastAndroid.SHORT);
      });
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    text1: {
      marginTop: marginTopDistance,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
    inputStyle: {
      marginTop: 20,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    createtext: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 14,
    },
    loginText: {
      color: '#2437E4',
    },
    buttonstyle: {
      backgroundColor: '#136D66',
      marginTop: 30,
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>

      <Text style={styles.text1}>
        Create Account
      </Text>
      <ScrollView>
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="OTP"
          placeholder="Write Your name"
          left={<TextInput.Icon icon="account-circle" />}
          onChangeText={(text) => setOTP(text)}
          value={OTP}
        />
        <Button styling={styles.buttonstyle} onPress={() => verifyOTP()}>Submit</Button>
        <Text style={styles.createtext}>
          Already have an account?
          <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>Login</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default OTP;