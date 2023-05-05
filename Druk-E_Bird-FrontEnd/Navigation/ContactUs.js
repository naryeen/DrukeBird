import * as React from 'react';
import {TextInput, DefaultTheme } from 'react-native-paper';
import {StyleSheet, View,Text, ScrollView} from 'react-native';
import Button from '../Components/Button';
import NavigationHeader from '../Components/NavigationHeader';
const ContactUs = () => {
  return (
    <View>
         <NavigationHeader title={'Contact Us'} />
         <Text style={styles.messages}>Leave a message</Text>
    <View style={styles.container}>
    {/* <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} > */}
    <ScrollView>
    <TextInput
    style={styles.name}
      mode="outlined"
      label="Name"
      placeholder="Write Your Name"
      // left={<TextInput.Icon icon="account-circle" />}
    />
    <TextInput
    style={styles.email}
      mode="outlined"
      label="Email"
      placeholder="Write Your Email"
      // left={<TextInput.Icon icon="email" />}
    />

<TextInput
    style={styles.message}
    mode="outlined"
    label="Message"
    placeholder="Write Your Message"
    multiline
      // left={<TextInput.Icon icon="email" />}
    />
    <Button styling={styles.buttonstyle}>Send Message</Button>
    {/* </KeyboardAvoidingView> */}
    </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor: '#FFFFFF',
    height: 410,
    marginTop: 40,
    width: 350,
    marginLeft: 16,
    borderRadius: 10,
    elevation: 20,
    borderColor: 'black'
  },
  messages:{
    color: 'gray',
    marginLeft: 25,
    marginTop: 35,

  },
  name: {
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 10,
    
  },
  email: {
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 10,
    
  },
  message:{
    marginTop:20,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  buttonstyle:{
    backgroundColor:'#136D66',
    marginTop:80,
    width:"100%"
  }
});

export default ContactUs;