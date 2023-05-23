import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../screens/Header';
import Boxes from '../screens/Boxes';



export default class StartBirdingScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                {/* <Header /> */}

                <Boxes />
            </View>

        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});


































// const StartBirdingScreen = ({ navigation }) => {

//     render() {
//         return (
//             <View style={styles.container}>

//                 <Header />
//                 <Boxes />

//             </View>
//         );
//     }
// };

// export default StartBirdingScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

// });