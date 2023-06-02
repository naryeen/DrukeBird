import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, ToastAndroid, Dimensions, StatusBar } from 'react-native';
import Button from "../Components/Button";
import axios from "axios";
const windowDimensions = Dimensions.get('window');
import ForgotPasswordHeader from "../Components/ForgotPasswordHeader";
const marginTopDistance = windowDimensions.height < 380 ? 30 : 50;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const forgetPassword = () => {
    if (!email) {
      ToastAndroid.show('Email is required.', ToastAndroid.SHORT);
      return;
    }

    let user = {
      email: email,
    };

    axios.post('https://druk-ebirds.onrender.com/api/v1/forgotPassword', user)
      .then(res => {
        if (res.status === 201) {
          // let message = typeof res.response !== 'undefined' ? res.response.data.message : res.message;
          ToastAndroid.show("Link is Successfully sent in Your Mail", ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
        ToastAndroid.show(message, ToastAndroid.SHORT);
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
    // Use widthPercentageToDP to set responsive horizontal padding
  
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