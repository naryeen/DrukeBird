import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const ExploreScreen = () => {
    return (
        <View style={styles.container}>
            <Button
                title="Explore Screen"
                onPress={() => alert("Button Click")}
            />
        </View>
    );
};
export default ExploreScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});