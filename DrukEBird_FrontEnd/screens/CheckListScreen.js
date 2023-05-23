import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const CheckListScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
           
            <Button
                title="Check List"
                onPress={() => alert("CheckList Screen")}
            />
        </View>
    );
};
export default CheckListScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});