import * as React from 'react';
import {TextInput } from 'react-native-paper';
import {StyleSheet, View,Text, ScrollView} from 'react-native';
import Button from '../components/Button';
const Register = ({navigation}) => {
 

return (
    <View style={styles.container}>
    <Text style={styles.text1}>
      Create Account
    </Text>
    <ScrollView>
    <TextInput
    style={styles.name}
      mode="outlined"
      label="Name"
      placeholder="Write Your Name"
      left={<TextInput.Icon icon="account-circle" />}
    />
    <TextInput
    style={styles.email}
      mode="outlined"
      label="Email"
      placeholder="Write Your Email"
      left={<TextInput.Icon icon="email" />}
    />

    <TextInput
    style={styles.dob}
      mode="outlined"
      label="DoB"
      placeholder="Write Your DoB"
      left={<TextInput.Icon icon="calendar" />}
    />
    <TextInput
    style={styles.country}
      mode="outlined"
      label="Country"
      placeholder="Write Your Country"
      left={<TextInput.Icon icon="flag" />}
    />

    <TextInput
    style={styles.profession}
      mode="outlined"
      label="Profession"
      placeholder="Write Your Profession"
      left={<TextInput.Icon icon="briefcase" />}
    />
    <TextInput
    style={styles.password}
      mode="outlined"
      secureTextEntry = {true}
      label="Password"
      placeholder="Write Your Password"
      left={<TextInput.Icon icon="lock" />}
    />
    <TextInput
    style={styles.cpassword}
      mode="outlined"
      secureTextEntry = {true}
      label="Confirompassword"
      placeholder="Enter the Your Password Again"
      left={<TextInput.Icon icon="key-variant"/>}
    />
    <Button styling={styles.buttonstyle} >Create Account</Button>
    <Text style={styles.createtext}>
    Already have an account?
      <Text style={styles.loginText} onPress={()=>navigation.replace('Login')}>Login</Text>
    </Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:10
  },
  text1:{
    marginTop:60,
    fontSize:24,
    fontWeight:"bold",
    textAlign:"center"
  },
  name: {
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 5,
    
  },
  email: {
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 5,
    
  },
  dob:{
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 5
  },
  country:{
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 5
  },
  profession:{
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 5
  },
  password:{
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 5
  },
  cpassword:{
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 5
  },
  createtext:{
    marginTop:10,
    textAlign:'center',
    fontSize:14
  },
  loginText:
  {
    color:'#2437E4'
  },
  buttonstyle:{
    backgroundColor:'#136D66',
    marginTop:50,
    width:"100%"
  }
});

export default Register;