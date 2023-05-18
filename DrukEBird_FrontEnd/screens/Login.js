import React, { useState, useEffect, useContext } from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, Image, ToastAndroid } from 'react-native';
// import Toast from 'react-native-toast-message';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const{login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/logo.png')} />

      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Email"
        placeholder="Write Your Email"
        left={<TextInput.Icon icon="email" />}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Password"
        placeholder="Write Your Password"
        left={<TextInput.Icon icon="lock" />}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Text style={styles.forgetpasswordtext} onPress={() => navigation.replace('ForgetPassword')}>
        Forgot Password?
      </Text>
      <View style={styles.createbutton}>
        {/* <Button onPress={() => userlogin()}>LogIn</Button> */}
        <Button onPress={() => {login(email,password)}}>LogIn</Button>

      </View>
      <Text style={styles.createtext}>
        Don't have an account?
        <Text style={styles.createaccountText} onPress={() => navigation.replace('SignUp')}>Create a new account</Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text1: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  inputStyle: {
    marginTop: 20,
    borderColor: '#ccc',
    borderRadius: 5,
    
  },
  createbutton:{
    marginTop:50,
  },
  createtext:{
    marginTop:20,
    textAlign:'center',
    fontSize:14,
  },
  createaccountText:{
    color:'#2437E4'
  },
  image:{
    maxWidth:'70%',
    maxHeight:230,
    alignSelf: 'center',
    marginTop:100,
    
  },
  forgetpasswordtext:{
    fontSize:14,
    marginTop:5,
    textAlign:'right',
    color:'#2437E4'
  },
  backimage:{
    backgroundColor:'transparent',
    opacity:0.2,
  },
});

export default LogIn;