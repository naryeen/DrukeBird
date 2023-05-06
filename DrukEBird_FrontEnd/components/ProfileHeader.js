// For custom section in hamberger menus
import { View, StyleSheet, Alert } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import {Avatar,Title,Caption,Drawer} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export function DrawerContent(props) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                <View style={styles.drawerContent}>
                    <View style={{ flexDirection: 'row', marginTop: 50 }}>
                        <View style={styles.userInfoSection}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                                }}
                                size={90}
                            />
                            <View style={{ marginLeft: 1, flexDirection: 'column' }}>
                                <Title style={styles.title}>Cheki Lhamu</Title>
                                <Caption style={styles.caption}> View Profile</Caption>
                            </View>

                        </View>
                    </View>


                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="bird" size={24} color="white" />
                            )}
                            label="About"
                            labelStyle={{color:"white"}}
                            onPress={() => navigation.navigate('About')}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="settings" size={24} color="white" />
                            )}
                            label="Setting"
                            labelStyle={{color:"white"}}
                            onPress={() => navigation.navigate('Setting')}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="quick-contacts-dialer" size={24} color="white" />
                            )}
                            label="Contact US"
                            labelStyle={{color:"white"}}
                            onPress={() => navigation.navigate('ContactUs')}

                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Octicons name="checklist" size={24} color="#fff" />
                            )}
                            label="Help"
                            labelStyle={{color:"white"}}
                            onPress={() => navigation.navigate('Help')}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='exit-to-app' color={'#fff'} size={size} />
                            )}
                            label="Sign Out"
                            labelStyle={{color:"white"}}
                            onPress={() => { }}

                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
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
        backgroundColor: '#184e4a'},
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
        alignItems: 'center',},
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5},
    drawerSection: {
        marginTop: 35}
    });