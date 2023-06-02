import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './Screens/MainTabScreen';
import { DrawerContent } from './Screens/DrawerContent';
const Drawer = createDrawerNavigator();
const MyDrawer = () => {
   return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{
         headerTitle: 'DrukeBird',
         headerTitleAlign: 'center',
         headerTintColor: '#136D66'
      }}>
         <Drawer.Screen name="DrukeBird" component={MainTabScreen} />
      </Drawer.Navigator>
   );
};

export default MyDrawer;