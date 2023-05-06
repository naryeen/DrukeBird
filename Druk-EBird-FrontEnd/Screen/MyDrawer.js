import { createDrawerNavigator } from '@react-navigation/drawer';
// import { DrawerContent } from '../Screen/DrawerContent';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
       <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="DrukeBird" component={StartBirding} />   
       </Drawer.Navigator>
    );
 };

 export default MyDrawer;