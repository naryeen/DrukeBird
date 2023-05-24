import React, { useContext } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';

const { width, height } = Dimensions.get('window');

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
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{ uri: userInfo.user.photo }}
              size={width * 0.2}
            />
            <View style={styles.userInfo}>
              <Title style={styles.title}>{userInfo.user.name}</Title>
              <Caption style={styles.caption} onPress={() => navigation.replace('MyProfile')}>
                View Profile
              </Caption>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="bird" size={size} color="white" />
              )}
              label="About"
              labelStyle={styles.drawerItemLabel}
              onPress={() => navigation.navigate('About')}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="quick-contacts-dialer" size={size} color="white" />
              )}
              label="Contact US"
              labelStyle={styles.drawerItemLabel}
              onPress={() => navigation.navigate('ContactUs')}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Octicons name="checklist" size={size} color="#fff" />
              )}
              label="Help"
              labelStyle={styles.drawerItemLabel}
              onPress={() => navigation.navigate('Help')}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <TouchableOpacity onPress={handleSignOut} style={styles.signOutContainer}>
              <MaterialIcons name="logout" size={width * 0.05} color="white" style={styles.signOutIcon} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184e4a',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#184e4a',
  },
  userInfoSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.15,
    paddingHorizontal: width * 0.05,
  },
  userInfo: {
    marginLeft: width * 0.05,
    flexDirection: 'column',
  },
  title: {
    fontSize: width * 0.04,
    marginTop: width * 0.005,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: width * 0.035,
    lineHeight: width * 0.035,
    color: 'white',
    textDecorationLine: 'underline',
  },
  drawerSection: {
    marginTop: width * 0.08,
  },
  drawerItemLabel: {
    color: 'white',
    fontSize: width * 0.04,
  },
  signOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.08,
  },
  signOutIcon: {
    marginLeft: width * 0.05,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: width * 0.085,
    fontSize: width * 0.04,
  },
});