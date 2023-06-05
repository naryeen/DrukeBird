import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const UnknownVerificationHeader = ({ title}) => {
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

import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPercentageToDP('8%'),
    paddingHorizontal: widthPercentageToDP('5%'),
    borderRadius: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
    backgroundColor: '#fff',
  },
  title: {
    flex: 1,
    color: '#136D66',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP('5%'),
    paddingHorizontal: widthPercentageToDP('2%'),
    marginLeft: widthPercentageToDP('13%'),
  },
});
export default UnknownVerificationHeader;