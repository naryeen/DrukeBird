import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './Screens/MainTabScreen';
import { DrawerContent } from './Screens/DrawerContent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerTitle: 'DrukeBird',
        headerTitleAlign: 'center',
        headerTintColor: '#136D66',
        headerTitleStyle: {
          fontSize: 25, // Increase the size of the header title
        },

        drawerIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons
            name="menu"
            size={30} // Change the size of the hamburger icon
            color={color}
          />
        ),
        drawerIconStyle: {
          width: 80, // Change the width of the drawer icon container
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Drawer.Screen
        name="DrukeBird"
        component={MainTabScreen}
        options={{
          headerStyle: {
            height: 75, // Change the height of the header here
            elevation: 10, // Apply shadow on Android
            shadowColor: '#000', // Set shadow color on iOS
            shadowOffset: { width: 0, height: 2 }, // Set shadow offset on iOS
            shadowOpacity: 0.9, // Set shadow opacity on iOS
            shadowRadius: 3, // Set shadow radius on iOS
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
