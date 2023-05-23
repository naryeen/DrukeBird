
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';



import MainTabScreen from './screens/MainTabScreen';
import { DrawerContent } from './screens/DrawerContent';
import NotificationScreen from './screens/NotificationScreen';

const Drawer = createDrawerNavigator();


const App = () => {

  return (

    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent{...props} />}>
        <Drawer.Screen name="Druk  Bird" component={MainTabScreen} />
        <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />

      </Drawer.Navigator>
    </NavigationContainer>



  );
}

export default App;
















































// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
