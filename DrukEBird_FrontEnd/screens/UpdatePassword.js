import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

const UpdatePassword = () => {
  const { userInfo } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePassword = () => {
    let userID = userInfo.user._id;
    const data = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Fetch user's current data including password
    axios.get(`https://drukebird.onrender.com/api/v1/users/${userID}`)
      .then((response) => {
        const userData = response.data;
        console.log(userData)
        const currentPasswordFromAPI = userData.password;
        
        // Compare entered current password with the one from the API
        if (currentPassword !== currentPasswordFromAPI) {
          setError("Current password is incorrect.");
          return;
        }

        // Call API to update password
        axios.patch(`https://drukebird.onrender.com/api/v1/users/${userID}/updatePassword`, data)
          .then(() => {
            console.log("Password updated successfully!");
          })
          .catch((err) => {
            setError(err.response.data.message);
          });
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Update Password" onPress={handleUpdatePassword} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
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
});

export default UpdatePassword;
