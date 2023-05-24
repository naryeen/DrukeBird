import React, { useState } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from "../Components/Button";
import axios from "axios";

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [DoB, setDoB] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const windowDimensions = Dimensions.get('window');

  const marginTopDistance = windowDimensions.height < 380 ? 30 : 60;

  const register = () => {
    let user = {
      name: name,
      email: email,
      dob: DoB,
      country: country,
      profession: profession,
      password: password,
      passwordConfirm: passwordConfirm
    };
    axios
      .post('https://druk-ebirds.onrender.com/api/v1/users/signup', user)
      .then(res => {
        if (res.data.status == "success") {
          ToastAndroid.show('Successfully Created Your Account',
            ToastAndroid.LONG);

          setTimeout(() => {
            navigation.navigate('LogIn');
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
          label="name"
          placeholder="Write Your name"
          left={<TextInput.Icon icon="account-circle" />}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="email"
          placeholder="Write Your Email"
          left={<TextInput.Icon icon="email" />}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="DoB"
          placeholder="MM/DD/YYYY"
          left={<TextInput.Icon icon="calendar" />}
          onChangeText={(text) => setDoB(text)}
          value={DoB}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Country"
          placeholder="Write Your Country"
          left={<TextInput.Icon icon="flag" />}
          onChangeText={(text) => setCountry(text)}
          value={country}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Profession"
          placeholder="Write Your Profession"
          left={<TextInput.Icon icon="briefcase" />}
          onChangeText={(text) => setProfession(text)}
          value={profession}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          secureTextEntry={true}
          label="Password"
          placeholder="Write Your Password"
          left={<TextInput.Icon icon="lock" />}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          secureTextEntry={true}
          label="Confirm Password"
          placeholder="Enter the Your Password Again"
          left={<TextInput.Icon icon="key-variant" />}
          onChangeText={(text) => setPasswordConfirm(text)}
          value={passwordConfirm}
        />
        <Button styling={styles.buttonstyle} onPress={() => register()}>Create Account</Button>
        <Text style={styles.createtext}>
          Already have an account?
          <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>Login</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignUp;