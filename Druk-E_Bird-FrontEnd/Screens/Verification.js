import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from "../Components/Button";
import axios from "axios";

const Verifying = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const windowDimensions = Dimensions.get('window');

  const marginTopDistance = windowDimensions.height < 380 ? 30 : 60;

  const Verify = () => {
    let verifydata = {
      name: name,
      email: email,
    };
    
    axios
      .post('https://druk-ebirds.onrender.com/api/v1/users/verification', verifydata)
      .then(res => {
        if (res.data.status == "success") {
          ToastAndroid.show('Please check your mail',
            ToastAndroid.LONG);

          setTimeout(() => {
            navigation.navigate('OTP');
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

   //data pass to VerifyingdataSave
  //  const VerifyingdataSave = () => {
  //   var Verifyingdata = {
  //     name: name,
  //     email: email,
  //   };
  //   navigation.navigate('OTP', { Verifyingdata: Verifyingdata });
  // };


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
          label="Name"
          placeholder="Write Your name"
          left={<TextInput.Icon icon="account-circle" />}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Email"
          placeholder="Write Your Email"
          left={<TextInput.Icon icon="email" />}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        
        <Button styling={styles.buttonstyle} onPress={() => Verify()}>Create Account</Button>
        <Text style={styles.createtext}>
          Already have an account?
          <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>Login</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Verifying;