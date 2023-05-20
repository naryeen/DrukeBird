import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, ToastAndroid } from "react-native";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import NavigationHeader from "../Components/NavigationHeader";
import Button from "../Components/Button";

const UpdatePassword = () => {
  const { userToken } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = () => {
    const data = {
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: confirmPassword,
    };
  
    if (newPassword === "" || confirmPassword === "" || currentPassword === "") {
      setError("All fields are required.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    console.log(data);
    axios
      .patch(
        "https://drukebird.onrender.com/api/v1/users/updateMyPassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          ToastAndroid.show("Password updated successfully", ToastAndroid.LONG);
          console.log("Password updated successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  }; 

  return (
    <View style={styles.container}>
      <NavigationHeader title="Update Password"/>
      <View style={styles.header}>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
        required={true}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        required={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)
        }
        required={true}
      />
      </View>
      <Button styling={styles.buttonstyle} onPress={handleUpdatePassword}>Update Password</Button>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor: "#f2f2f2",
    marginTop:20
   
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomColor: "#136D66",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  buttonstyle:{
    backgroundColor:'#136D66',
    marginTop:30,
    width:"100%"
  }
});

export default UpdatePassword;

