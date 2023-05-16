import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, ToastAndroid } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditInfo = () => {
  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [profession, setProfession] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const userID = userInfo.user._id;

  const handleUpdateProfile = () => {
    const data = {
      name,
      email,
      dob,
      profession,
    };

    setIsLoading(true);
    axios
      .patch(`https://drukebird.onrender.com/api/v1/users/updateMe`, data,         {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        if (res.data.status === "success") {
          ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG);
          console.log("Profile updated successfully!");

          // setCurrentPassword("");
          // setNewPassword("");
          // setConfirmPassword("");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });

    // console.log("Here")
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userInfo.user.name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.user.email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={userInfo.user.dob}
        onChangeText={(text) => setDob(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Profession"
        value={userInfo.user.profession}
        onChangeText={(text) => setProfession(text)}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
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

export default EditInfo;
