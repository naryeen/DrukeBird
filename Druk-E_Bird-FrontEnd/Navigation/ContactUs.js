import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import Button from '../Components/Button';
import NavigationHeader from '../Components/NavigationHeader';

const { width, height } = Dimensions.get('window');

const ContactUs = () => {
  return (
    <View>
      <NavigationHeader title={'Contact Us'} />
      <Text style={styles.messages}>Leave a message</Text>
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            style={styles.name}
            mode="outlined"
            label="Name"
            placeholder="Write Your Name"
          />
          <TextInput
            style={styles.email}
            mode="outlined"
            label="Email"
            placeholder="Write Your Email"
          />
          <TextInput
            style={styles.message}
            mode="outlined"
            label="Message"
            placeholder="Write Your Message"
            multiline
          />
          <Button styling={styles.buttonStyle}>Send Message</Button>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.03,
    backgroundColor: '#FFFFFF',
    height: height * 0.7,
    marginTop: height * 0.04,
    width: width * 0.95,
    marginLeft: width * 0.025,
    borderRadius: width * 0.02,
    elevation: 20,
    borderColor: 'black',
  },
  messages: {
    color: 'gray',
    marginLeft: width * 0.07,
    marginTop: height * 0.035,
    fontSize: width * 0.05,
  },
  name: {
    marginTop: height * 0.02,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
  },
  email: {
    marginTop: height * 0.02,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
  },
  message: {
    marginTop: height * 0.02,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
    height: height*0.3,
  },
  buttonStyle: {
    backgroundColor: '#136D66',
    marginTop: height * 0.08,
    width: '100%',
  },
});

export default ContactUs;