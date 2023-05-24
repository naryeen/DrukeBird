import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const NavigationHeader = ({title}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.Headercontainer}>
      <TouchableOpacity onPress={() => navigation.goBack('MainScreen')}>
      <Ionicons name="chevron-back" size={24} color="#136D66" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = {
  Headercontainer: {
    // backgroundColor: '#FFFFFF',
    // shadowColor: '#000000',
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    height: 60,
    marginTop: 0,
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
    paddingHorizontal: 130,
  },
};

export default NavigationHeader;