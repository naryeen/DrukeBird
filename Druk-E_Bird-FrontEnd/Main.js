import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './Screens/MainTabScreen';
import { DrawerContent } from './Screens/DrawerContent';
const Drawer = createDrawerNavigator();
const MyDrawer = () => {
    return (
       <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Druk  Bird" component={MainTabScreen} />   
       </Drawer.Navigator>
    );
 };

 export default MyDrawer;