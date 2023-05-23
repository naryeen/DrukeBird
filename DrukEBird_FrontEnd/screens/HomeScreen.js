
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Image, Button, ImageBackground, Text, TouchableHighlight, SafeAreaView, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
// import image4 from '../assets/images/backg.png';
// const Separator = () => <View style={styles.separator} />;



const HomeScreen = () => {

    const images = [
        image1,
        image2,
        image3,  
    ];
    // const image = [
    //     image4,
    // ];
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleUnhover = () => {
        setIsHovered(false);
    };

    return (
        <View style={styles.container}>
            <SliderBox images={images} SliderBoxHeight={200} dotColor="red" inactiveDotColor="black"
                dotStyle={{ height: 10, width: 10, borderRadius: 50 }}
                imageLoadingColor="black"
                autoplay={true}
                autoplayInterval={1000}
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


                <TouchableOpacity onPress={() => alert('Button pressed')}>
                    <View style={{
                        backgroundColor: '#136d66',
                        padding: 10,
                        position: 'relative',
                        marginTop: 100,
                        marginLeft: 100,
                        right: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: 'white' }}>How it works {'>>'} </Text>
                    </View>
                </TouchableOpacity>


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
    // fixToText: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // separator: {
    //     marginVertical: 8,
    //     borderBottomColor: '#737373',
    //     borderBottomWidth: StyleSheet.hairlineWidth,
    // },
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

});


export default HomeScreen;





