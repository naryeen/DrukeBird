import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const UnknownHeader = ({ title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack('MainScreen')}>
        <Ionicons name="chevron-back" size={24} color="#136D66" />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const paddingHorizontal = width * 0.05;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: paddingHorizontal,
    borderRadius: 1,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    flex: 1,
    color: "#136D66",
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 10,
    marginLeft: "23%" // Adjust this value to your preference
  },
});
export default UnknownHeader;