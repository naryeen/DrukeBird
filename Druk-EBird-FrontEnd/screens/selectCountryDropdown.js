import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Menu, Divider, Provider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';


const App = () => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleMenuItemSelection = (item) => {
    setSelectedItem(item);
    closeMenu();
  };

  return (
    <Provider>
      <View style={{ padding: 20,paddingTop:50 }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button 
                icon={({ size, color }) => <AntDesign name="down" size={size} color={color} />}
                onPress={openMenu} 
                style={styles.submit}>
                    
               
               
               
                 


                {selectedItem ? selectedItem : 'Select an option'}
                
            </Button>
          }>
          <Menu.Item onPress={() => handleMenuItemSelection('Samtse')} title="Samdrup Jongkhar" />
          <Divider />
          <Menu.Item onPress={() => handleMenuItemSelection('Mongar')} title="Mongar" />
          <Divider />
          <Menu.Item onPress={() => handleMenuItemSelection('zhemgang')} title="Trashigang" />
          <Menu.Item onPress={() => handleMenuItemSelection('Samdrup Jongkhar')} title="Samdrup Jongkhar" />
          <Divider />
          <Menu.Item onPress={() => handleMenuItemSelection('Mongar')} title="Mongar" />
          <Divider />
          <Menu.Item onPress={() => handleMenuItemSelection('Trashigang')} title="Trashigang" />
        </Menu>
      </View>
    </Provider>

  );
};

const styles = StyleSheet.create({
    submit: {
        borderWidth:1,
        borderColor:"black",
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        justifyContent:'space-around',
       
    },
    submitText:{
        paddingTop:20,
        paddingBottom:20,
        color:'#fff',
        textAlign:'center',
        backgroundColor:'#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    icon: {
        padding:100,
        
    },
  });

export default App;

