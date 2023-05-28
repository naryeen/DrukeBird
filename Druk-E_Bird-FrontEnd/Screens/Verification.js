// import React, { useState } from "react";
// import { TextInput } from 'react-native-paper';
// import { StyleSheet, View, Text, ScrollView, Dimensions, ToastAndroid } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Button from "../Components/Button";
// import axios from "axios";

// const Verifying = () => {
//   const navigation = useNavigation();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const windowDimensions = Dimensions.get('window');

//   const marginTopDistance = windowDimensions.height < 380 ? 30 : 60;

//   const Verify = () => {
//     if (name.trim() === "") {
//       ToastAndroid.show('Please enter your name', ToastAndroid.SHORT);
//       return;
//     }

//     else if (email.trim() === "") {
//       ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
//       return;
//     }

//     let verifydata = {
//       name: name,
//       email: email,
//     };
    
//     axios
//       .post('https://druk-ebirds.onrender.com/api/v1/users/verification', verifydata)
//       .then(res => {
//         if (res.data.status == "success") {
//           ToastAndroid.show('Please check your mail',
//             ToastAndroid.LONG);

//           setTimeout(() => {
//             navigation.navigate('OTP');
//           }, 200);
//         }
//       })
//       .catch(err => {
//         JSON.stringify(err);
//         let message =
//           typeof err.response !== 'undefined'
//             ? err.response.data.message
//             : err.message;

//         ToastAndroid.show(message,
//           ToastAndroid.SHORT);
//       });
//   };


//   const styles = StyleSheet.create({
//     container: {
//       padding: 10,
//     },
//     text1: {
//       marginTop: marginTopDistance,
//       fontSize: 24,
//       fontWeight: "bold",
//       textAlign: "center",
//     },
//     inputStyle: {
//       marginTop: 20,
//       borderColor: '#ccc',
//       borderRadius: 5,
//     },
//     createtext: {
//       marginTop: 20,
//       textAlign: 'center',
//       fontSize: 14,
//     },
//     loginText: {
//       color: '#2437E4',
//     },
//     buttonstyle: {
//       backgroundColor: '#136D66',
//       marginTop: 30,
//       width: "100%",
//     },
//   });

//   return (
//     <View style={styles.container}>

//       <Text style={styles.text1}>
//         Create Account
//       </Text>
//       <ScrollView>
//         <TextInput
//           style={styles.inputStyle}
//           mode="outlined"
//           label="Name"
//           placeholder="Write Your name"
//           left={<TextInput.Icon icon="account-circle" />}
//           onChangeText={(text) => setName(text)}
//           value={name}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           mode="outlined"
//           label="Email"
//           placeholder="Write Your Email"
//           left={<TextInput.Icon icon="email" />}
//           onChangeText={(text) => setEmail(text)}
//           value={email}
//         />
        
//         <Button styling={styles.buttonstyle} onPress={() => Verify()}>Create Account</Button>
//         <Text style={styles.createtext}>
//           Already have an account?
//           <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>Login</Text>
//         </Text>
//       </ScrollView>
//     </View>
//   );
// };

// export default Verifying;

import React, { useState } from "react";
import { TextInput, Modal } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from "../Components/Button";
import axios from "axios";

const windowDimensions = Dimensions.get('window');

  const marginTopDistance = windowDimensions.height < 380 ? 30 : 60;

const Verifying = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false); // New state for OTP modal visibility
  const [OTPValue, setOTPValue] = useState(""); // New state for OTP value
  

  const Verify = () => {
    if (name.trim() === "") {
      ToastAndroid.show('Please enter your name', ToastAndroid.SHORT);
      return;
    }

    else if (email.trim() === "") {
      ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
      return;
    }

    let verifydata = {
      name: name,
      email: email,
    };
    
    axios
      .post('https://druk-ebirds.onrender.com/api/v1/users/verification', verifydata)
      .then(res => {
        if (res.data.status === "success") {
          ToastAndroid.show('Please check your mail', ToastAndroid.LONG);
          setShowOTP(true); // Show OTP modal
        }
      })
      .catch(err => {
        JSON.stringify(err);
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;

        ToastAndroid.show(message, ToastAndroid.SHORT);
      });
  };

  const verifyOTP = () => {
    if (OTPValue.trim() === "") {
      ToastAndroid.show('Please enter your OTP', ToastAndroid.SHORT);
      return;
    }

    let verifyOTPdata = {
      otp: OTPValue
    };
    axios
      .post('https://druk-ebirds.onrender.com/api/v1/users/OTP', verifyOTPdata)
      .then(res => {
        if (res.data.status === "success") {
          ToastAndroid.show('OTP matched', ToastAndroid.LONG);
          setShowOTP(false); // Hide OTP modal
          navigation.navigate('SignUp');
        }
      })
      .catch(err => {
        JSON.stringify(err);
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;

        ToastAndroid.show(message, ToastAndroid.SHORT);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Create Account</Text>
      <ScrollView>
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Name"
          placeholder="Write Your name"
          left={<TextInput.Icon icon="account-circle" />}
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          label="Email"
          placeholder="Write Your Email"
          left={<TextInput.Icon icon="email" />}
          onChangeText={text => setEmail(text)}
          value={email}
        />
  
        <Button styling={styles.buttonstyle} onPress={Verify}>
          Create Account
        </Button>
  
        <Text style={styles.createtext}>
          Already have an account?
          <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>
            Login
          </Text>
        </Text>
  
        {/* OTP Modal */}
        <Modal visible={showOTP} onDismiss={() => setShowOTP(false)}>
          <View style={styles.container1}>
            <Text style={styles.text2}>Enter OTP</Text>
            <ScrollView>
              <TextInput
                style={styles.inputStyle1}
                mode="outlined"
                label="OTP"
                placeholder="Write Your OTP"
                left={<TextInput.Icon icon="account-circle" />}
                onChangeText={text => setOTPValue(text)}
                value={OTPValue}
              />
              <Button styling={styles.buttonstyle1} onPress={verifyOTP}>
                Submit
              </Button>
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    </View>
  )};
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    container1:{
      backgroundColor: '#A0A09F',
      elevation: 2,
      borderRadius: 5,
      marginLeft: 18,
      width: "90%",
      height: "95%",
      
    },
    text1: {
      marginTop: marginTopDistance,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
    text2:{
      marginTop: "6%",
      fontSize: 22,
      marginLeft: "30%",
    },
    inputStyle: {
      marginTop: 20,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    inputStyle1: {
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
    buttonstyle1: {
      backgroundColor: '#136D66',
      marginTop: 20,
      width: "100%",
    },
  });

  

export default Verifying;