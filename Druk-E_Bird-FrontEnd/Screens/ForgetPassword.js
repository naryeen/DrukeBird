import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View,StatusBar } from 'react-native';
import Button from "../Components/Button";
import axios from "axios";
import ForgotPasswordHeader from "../Components/ForgotPasswordHeader";
import Toast from 'react-native-root-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const forgetPassword = () => {
    if (!email) {
      Toast.show("Please enter your email", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      return;
    }

    let user = {
      email: email,
    };

    axios.post('https://druk-ebirds.onrender.com/api/v1/forgotPassword', user)
      .then(res => {
        if (res.status === 201) {
          Toast.show("Link is Successfully sent in Your Mail", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
          
        }
      })
      .catch(err => {
        let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
        Toast.show(message, {duration: Toast.durations.SHORT,});
      });
  };

  return (
    <View style={styles.container}>
      <ForgotPasswordHeader title={"Forget Password"}/>
      <View>
      <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Email"
          placeholder="Write Your Email"
          left={<TextInput.Icon icon="email" />}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      <Button styling={styles.buttonStyle} onPress={() => forgetPassword()}>Send</Button>
    </View>
    <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputStyle: {
    marginTop: 20,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 380,
    marginLeft: 5,
  },
  buttonStyle: {
    marginTop: 20,
    marginLeft:5
},
});

export default ForgetPassword;