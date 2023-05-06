import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Avatar, Button, IconButton, TextInput } from "react-native-paper";

const Dummmy = () => {
  const [name, setName] = useState("Cheki");
  const [email, setEmail] = useState("cheki@gmail.com");
  const [dob, setDob] = useState("12-3-4");
  const [profession, setProfession] = useState("Teacher");

  const [image, setImage] = useState(
    require("../assets/images/Users/default.jpg")
  );

  const handleSaveProfile = () => {
    // Handle saving profile changes here
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          left={<TextInput.Icon name="email" />}
        />
        <TextInput
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          left={<TextInput.Icon name="text" />}
          // multiline={true}
          // numberOfLines={4}
        />

        <TextInput
          label="Profession"
          value={profession}
          onChangeText={setProfession}
          left={<TextInput.Icon name="text" />}
          // multiline={true}
          // numberOfLines={4}
        />

        <Button
          mode="contained"
          onPress={handleSaveProfile}
          style={styles.saveButton}
        >
          Save Profile
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  editPictureButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  body: {
    marginTop: 20,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default Dummmy;
