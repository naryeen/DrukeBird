import React, { useState } from "react";
import { ActivityIndicator, MD2Colors,TextInput, Modal} from "react-native-paper";
import { StyleSheet, View, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import Button from "../Components/Button";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { postVerification, postOTP } from "../Api/Api";

const Verifying = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false); // New state for OTP modal visibility
  const [OTPValue, setOTPValue] = useState(""); // New state for OTP value
  const [Isloading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const Verify = () => {
    if (name.trim() === "") {
      Toast.show("Please enter your name", {
        duration: Toast.durations.SHORT,position: Toast.positions.CENTER
      });
      return;
    }
    else if (email.trim() === "") {
      Toast.show("Please enter your email", {
        duration: Toast.durations.SHORT,position: Toast.positions.CENTER
      });
      return;
    }
    let verifydata = {
      name: name,
      email: email,
    };
    setIsLoading(true);
    axios
      .post(postVerification, verifydata)
      .then(res => {
        if (res.data.status === "success") {
          Toast.show("Please check your mail", {
            duration: Toast.durations.SHORT,
          });
          setShowOTP(true); // Show OTP modal
        }
      })
      .catch(err => {
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;
        Toast.show(message, {duration: Toast.durations.SHORT,position: Toast.positions.CENTER});
      })
      .finally(() => setIsLoading(false));
  };

  const verifyOTP = () => {
    if (OTPValue.trim() === "") {
      Toast.show("Please enter your OTP", {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
      return;
    }

    let verifyOTPdata = {
      otp: OTPValue
    };
    setLoading(true);
    axios
      .post(postOTP, verifyOTPdata)
      .then(res => {
        if (res.data.status === "success") {
          Toast.show("OTP matched", {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
          setShowOTP(false); // Hide OTP modal
          navigation.navigate('SignUp');
        }
        else {
          Toast.show("OTP does not matched", {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
        }
      })
      .catch(err => {
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;
            Toast.show(message, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.con}>
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.text1}>Verify Email</Text>
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Name"
          placeholder="Enter your full name"
          left={<TextInput.Icon icon="account-circle" />}
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Email"
          placeholder="Enter your email"
          left={<TextInput.Icon icon="email" />}
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <Button styling={styles.buttonstyle} onPress={Verify}>
          Submit
        </Button>
        {Isloading && (
          <View style={styles.loadingContainer}>
           <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
        </View>
      )}
        <Text style={styles.createtext}>
          Already have an account?
          <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>  Login</Text>
        </Text>

        {/* OTP Modal */}
        <Modal visible={showOTP} onDismiss={() => setShowOTP(false)}>
          
            <View style={styles.container1}>
              <Text style={styles.text2}>Enter OTP</Text>
              <TextInput
                style={styles.inputStyle1}
                mode="outlined"
                label="OTP"
                placeholder="Enter your OTP"
                left={<TextInput.Icon icon="account-circle" />}
                onChangeText={text => setOTPValue(text)}
                value={OTPValue}
              />
              <Button styling={styles.buttonstyle1} onPress={verifyOTP}>
                Submit
              </Button>
              {loading && (
          <View style={styles.loadingContainer}>
           <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
        </View>
      )}
            </View>
          
        </Modal>
      </View>
      </KeyboardAwareScrollView>
    </View>
  )
};

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: 'center', 
  },
  container: {
    marginHorizontal: wp('4%'),
    marginTop: hp('30%') 
  },
  container1: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 5,
    width: wp('92%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  text1: {
    marginTop: hp('2%'), 
    fontSize: wp('6%'),
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    marginTop: hp('6%'), 
    fontSize: wp('6%'),
  },
  inputStyle: {
    marginTop: hp(2), 
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputStyle1: {
    marginTop: hp(2), 
    borderColor: '#ccc',
    borderRadius: 5,
    width: wp('85%'),
  },
  createtext: {
    marginTop: hp(2), 
    textAlign: 'center',
    fontSize: wp('3.5%'), 
  },
  loginText: {
    color: '#2437E4',
  },
  buttonstyle: {
    backgroundColor: '#136D66',
    marginTop: hp(3), 
    width: "100%",
  },
  buttonstyle1: {
    backgroundColor: '#136D66',
    marginVertical: hp(2), 
    //marginLeft: wp("15%"), 
    width: wp('85%'), 
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Verifying;