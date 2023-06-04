import React, { useState, useContext } from "react";
import { View,TextInput, StyleSheet, StatusBar} from "react-native";
import { ActivityIndicator, MD2Colors} from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Toast from 'react-native-root-toast';
import NavigationHeader from "../Components/NavigationHeader";
import Button from "../Components/Button";

const UpdatePassword = () => {
  const { userToken } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = () => {
    const data = {
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: confirmPassword,
    };
  
    if (newPassword === "")
    {
      Toast.show("Please enter your new password", {duration: Toast.durations.SHORT});
      
    }
    else if(confirmPassword === ""){
      Toast.show("Please enter your new confirm password", {duration: Toast.durations.SHORT});
      
    }
    else if(currentPassword === "")
    {
      Toast.show("Please enter your current password", {duration: Toast.durations.SHORT});
    }
    if (newPassword !== confirmPassword) {
      Toast.show("New password and confirm password do not match.", {duration: Toast.durations.SHORT});
      return;
    }
    setIsLoading(true);
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
          Toast.show("Password updated successfully", {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          Toast.show(err.response.data.message, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
        } else {
          Toast.show("An error occurred. Please try again.", {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
        }
      })
      .finally(() => setIsLoading(false));
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
      {isLoading && (
          <View style={styles.loadingContainer}>
           <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
        </View>
      )}
      <StatusBar />

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
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

export default UpdatePassword;

