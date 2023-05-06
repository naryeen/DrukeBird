import * as React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import Button from "../components/Button";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
      />
      <TextInput
        style={styles.email}
        mode="outlined"
        label="Email"
        placeholder="Write Your Email"
        left={<TextInput.Icon icon="email" />}
      />
      <TextInput
        style={styles.password}
        mode="outlined"
        label="Password"
        placeholder="Write Your Password"
        left={<TextInput.Icon icon="lock" />}
      />
      <Text style={styles.forgetpasswordtext}>Forgot Password?</Text>
      <View style={styles.createbutton}>
        <Button>LogIn</Button>
      </View>
      <Text style={styles.createtext}>
        Don't have an account?
        <Text
          style={styles.createaccountText}
          onPress={() => navigation.replace("Register")}
        >
          Create a new account
        </Text>
      </Text>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text1: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  name: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  email: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dob: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  country: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  profession: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  password: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  cpassword: {
    marginTop: 20,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  createbutton: {
    marginTop: 50,
  },
  createtext: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
  createaccountText: {
    color: "#2437E4",
  },
  image: {
    maxWidth: "60%",
    maxHeight: 230,
    alignSelf: "center",
    marginTop: 100,
  },
  forgetpasswordtext: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "right",
  },
  backimage: {
    backgroundColor: "transparent",
    opacity: 0.2,
  },
});
