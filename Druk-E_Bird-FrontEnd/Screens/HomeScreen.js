import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import image1 from '../assets/Image/image1.png';
import image2 from '../assets/Image/image2.png';
import image3 from '../assets/Image/image3.png';
import { SliderBox } from 'react-native-image-slider-box';
import Button from "../Components/Button";
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const navigation = useNavigation();
    const images = [
        image1,
        image2,
        image3,
    ];

    return (
        <View style={styles.container}>
            <SliderBox images={images} SliderBoxHeight={200} dotColor="red" inactiveDotColor="black"
                dotStyle={{ height: 10, width: 10, borderRadius: 50 }}
                imageLoadingColor="black"
                autoplay
                autoplayTimeout={9000}
                loop
                autoplayInterval={9000}
                CircleLoop={true}
                paginationBoxVerticalPadding={20} />
            <SafeAreaView style={styles.containers}>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.highlight}>Discover, learn & connect</Text>
                    <Text style={styles.baseText}>
                        with
                        <Text style={styles.innerText}> Druk eBird</Text>
                    </Text>
                    <Text style={styles.innerText1}> The ultimate tool for anyone who</Text>
                    <Text style={styles.baseText}> loves birds and nature</Text>
                </View>
                <Button styling={styles.buttonstyle} onPress={() => navigation.navigate('Help')}>How it works {'>>'}</Button>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 1,
    },
    containers: {
        backgroundColor: 'white',
        paddingTop: 30,
        flex: 1,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },

    highlight: {
        color: "#136d66",
        fontWeight: 'bold',
        justifyContent: 'space-between',
        fontSize: 18,

    },
    innerText: {
        color: "#136d66",
        fontWeight: 'bold',
        justifyContent: 'space-between',
        fontSize: 18

    },
    innerText1: {
        fontWeight: 'bold',
        justifyContent: 'space-between',
        paddingTop: 20,
        fontSize: 16

    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonstyle:{
        marginTop:120,
        width:"95%",
        marginLeft:10
    }

});


export default HomeScreen;




