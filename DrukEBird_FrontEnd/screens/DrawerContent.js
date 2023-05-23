// For custom section in hamberger menus

import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import User from '../assets/User.jpg';


export function DrawerContent(props) {
    const image = [
        User,
    ];
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} scrollEnabled={true}>
                <View style={styles.drawerContent}>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={styles.userInfoSection}>
                            <Avatar.Image

                                source={{
                                    uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                                }}
                                size={59}
                            />
                            {/* <Image images={User}
                                dotStyle={{ height: 10, width: 10, borderRadius: 50 }}
                                imageLoadingColor="black"
                                autoplay={true}
                                autoplayInterval={1000}
                                CircleLoop={true}
                                paginationBoxVerticalPadding={20} /> */}

                            <View style={{ marginLeft: 1, flexDirection: 'column' }}>
                                <Title style={styles.title}>Cheki Lhamu</Title>
                                <Caption style={styles.caption}> View Profile</Caption>
                            </View>

                        </View>
                    </View>



                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={'white'}
                                    size={size}

                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate("Home") }}

                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={'white'}
                                    size={size}

                                />
                            )}
                            label="Start Birding"
                            onPress={() => { props.navigation.navigate("StartBirding") }}

                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="pluscircleo" size={24} color="black" />
                            )}
                            label="Explore"
                            onPress={() => { props.navigation.navigate("Explore") }}

                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Octicons name="checklist" size={24} color="#fff" />
                            )}
                            label="CheckList"
                            onPress={() => { props.navigation.navigate("CheckList") }}

                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (

                                <Ionicons name="notifications" size={24} color="black" />
                            )}
                            label="Notification"
                            onPress={() => { props.navigation.navigate("NotificationScreen") }}

                        />
                    </Drawer.Section>

                </View>

            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={'#fff'} size={26} />
                    )}
                    label="About"
                    onPress={() => { }}

                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={'#fff'} size={26} />
                    )}
                    label="Setting"
                    onPress={() => { }}

                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={'#fff'} size={26} />
                    )}
                    label="Contact US"
                    onPress={() => { }}

                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={'#fff'} size={26} />
                    )}
                    label="Help"
                    onPress={() => { }}

                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='exit-to-app'
                            color={'#fff'}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { }}

                />

            </Drawer.Section>
        </View>
    );
}



const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#184e4a',
    },
    userInfoSection: {
        paddingLeft: 10,
        marginLeft: 20,
        fontWeight: 'bold',
        backgroundColor: '#184e4a',

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
        marginRight: 5,


    },

    drawerSection: {
        marginTop: 5,

    },
    bottomDrawerSection: {
        marginBottom: 10,

        borderTopWidth: 1,
        backgroundColor: '#184e4a',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,

    },
});

