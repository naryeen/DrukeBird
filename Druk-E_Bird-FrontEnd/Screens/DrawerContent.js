// For custom section in hamberger menus
import { View, StyleSheet, Alert, TouchableOpacity, Text, } from 'react-native';

import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../Context/AuthContext";
import React, { useContext } from "react";



export function DrawerContent(props) {
  const navigation = useNavigation();
  const { logout, userInfo } = useContext(AuthContext);

  const handleSignOut = () => {
    // Handle sign out logic here
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'NO', style: 'cancel' },
      { text: 'YES', onPress: () => logout() },
    ]);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={styles.drawerContent}>
          <View style={{ flexDirection: 'row', marginTop: 50 }}>
            <View style={styles.userInfoSection}>
              <Avatar.Image
                source={{
                  uri: userInfo.user.photo,
                }}
                size={90}
              />
              <View style={{
                marginLeft: 1,
                flexDirection: 'column'
              }}>
                <Title style={styles.title}>{userInfo.user.name}</Title>
                <Caption style={styles.caption} onPress={() => navigation.replace('MyProfile')}>View Profile</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="bird" size={24} color="white" />
              )}
              label="About"
              labelStyle={{ color: 'white' }}
              onPress={() => navigation.navigate('About')}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="settings" size={24} color="white" />
              )}
              label="Setting"
              labelStyle={{ color: 'white' }}
              onPress={() => navigation.navigate('Setting')}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="quick-contacts-dialer" size={24} color="white" />
              )}
              label="Contact US"
              labelStyle={{ color: 'white' }}
              onPress={() => navigation.navigate('ContactUs')}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Octicons name="checklist" size={24} color="#fff" />
              )}
              label="Help"
              labelStyle={{ color: 'white' }}
              onPress={() => navigation.navigate('Help')}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <TouchableOpacity onPress={handleSignOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="logout" size={24} color="white" style={{ marginLeft: "7%" }} />
              <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: "10%" }}>Sign Out</Text>
            </TouchableOpacity>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#184e4a",

  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#184e4a',

  },
  userInfoSection: {
    paddingLeft: 10,
    marginLeft: 40,
    fontWeight: 'bold',
    backgroundColor: '#184e4a'
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: "white",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "white",
    textDecorationLine: 'underline',
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  drawerSection: {
    marginTop: 35
  }
});

