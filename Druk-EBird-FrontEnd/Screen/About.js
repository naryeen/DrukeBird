import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, Component } from 'react';
import SettingHeader from './SettingHeader';
import { Style } from '@mui/icons-material';
import { style, width } from '@mui/system';
function About(){
    return(
        <View>
            <SettingHeader title={'About'} />
            <Image source={require('../assets/images/logo.jpg')} style={{width: 200, height: 200, backgroundColor: 'white', marginLeft: 90, marginTop: 10}}/>
            <Text style={{width: 360, marginLeft:15, marginTop: 15}}>Druk EBird is managed by the Royal Society for Protection of Nature on behalf of birding, research, 
            and conservation communication to provide rich and rapidly growing database of bird sighting. {'\n'}{'\n'}
            Druk EBird documents the bird distribution, abundance, and trends through checklist data collected within a simple, scientific framework.{'\n'}{'\n'}
            In addition to providing a space for birdwatchers to share their obsevations, Druk Ebird can be also used by the researchers to study about the bird population, 
            distribution and existence.{'\n'}{'\n'}
            Overall, it is a powerful application for researchers, birdwatchers, providing a platform for users and contributing to our understanding of 
            birds and their conservation.
            </Text>
        </View>
    );
}
export { About }