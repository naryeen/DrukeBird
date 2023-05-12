import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import Button from "../Components/Button";
import axios from "axios";
import ForgotPasswordHeader from "../Components/ForgotPasswordHeader";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const forgetpassword = () => {
    if (!email) {
      ToastAndroid.show('Email is required.', ToastAndroid.SHORT);
      return;
    }

    let user = {
      email: email,
    };

    axios.post('https://druk-ebirds.onrender.com/api/v1/forgotPassword', user)
      .then(res => {
        if (res.data.status === 201) {
          // let message = typeof res.response !== 'undefined' ? res.response.data.message : res.message;
          ToastAndroid.show(res.response.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
        ToastAndroid.show(message, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <ForgotPasswordHeader title="Forget Password"/>
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="email"
        placeholder="Write Your Email"
        left={<TextInput.Icon icon="email" />}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button styling={styles.buttonstyle} onPress={() => forgetpassword()}>Send</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop:30
  },
  inputStyle: {
    marginTop: 20,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonstyle: {
    backgroundColor: '#136D66',
    marginTop: 30,
    width: "100%"
  }
});

export default ForgetPassword;
