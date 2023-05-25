import React from "react";
import { View, Text, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const UpdatePasswordHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack('MainScreen')}>
          <Ionicons name="chevron-back" size={24} color="#136D66" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 0.08 * height,
    paddingHorizontal: 0.04 * width,
    borderRadius: 1,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    color: "#136D66",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: "25%",
  },
};

export default UpdatePasswordHeader;