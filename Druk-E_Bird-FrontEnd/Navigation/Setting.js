import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState} from 'react';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import NavigationHeader from '../Components/NavigationHeader';
function Setting() {
    const [sname, setValue] = useState(0);
    const [distance, setValue1] = useState(0);

    const items = [
        { label: "Common Name", value: 0 },
        { label: "Scientific Name", value: 1 },

    ];
    const items1 = [
        { label: "Miles", value: 0 },
        { label: "Kilometers", value: 1 },

    ];
    return (
        <View style={{marginTop:35}}>
            <NavigationHeader title={'Settings'} />
            <View style={styles.species}>
                <Text style={styles.speciesname}>Species name display</Text>
                <RadioForm>
                    {
                        items.map((obj, index) => (
                            <RadioButton style={{ marginBottom: 15, marginLeft: 20 }} key={index}>
                                <RadioButtonInput obj={obj} index={index} isSelected={index ===
                                    sname} onPress={(sname) => setValue(sname)} borderWidth={1.5} buttonInnerColor='#184E4A'
                                    buttonOuterColor={index === sname ? '#184E4A' : 'black'}
                                    buttonSize={15}
                                    buttonWrapStyle={{ marginRight: 15 }}
                                />
                                <RadioButtonLabel obj={obj} index={index} labelStyle={{
                                    color: index ===
                                        sname ? '#184E4A' : 'black', fontSize: 16, fontWeight: 'regular'
                                }} />
                            </RadioButton>

                        ))
                    }
                </RadioForm>
            </View>
            <View style={styles.species}>
                <Text style={styles.speciesname}>Show distance</Text>
                <RadioForm>
                    {
                        items1.map((obj, index) => (
                            <RadioButton style={{ marginBottom: 15, marginLeft: 20 }} key={index}>
                                <RadioButtonInput obj={obj} index={index} isSelected={index ===
                                    distance} onPress={(distance) => setValue1(distance)} borderWidth={1.5} buttonInnerColor='#184E4A'
                                    buttonOuterColor={index === distance ? '#184E4A' : 'black'}
                                    buttonSize={15}
                                    buttonWrapStyle={{ marginRight: 15 }}
                                />
                                <RadioButtonLabel obj={obj} index={index} labelStyle={{
                                    color: index ===
                                        distance ? '#184E4A' : 'black', fontSize: 16, fontWeight: 'regular'
                                }} />
                            </RadioButton>

                        ))
                    }
                </RadioForm>
            </View>

        </View>
    );
}
export const ButtonGroup = ({ buttons, buttons1, doSomethingAfterClick, doSomethingAfterClick1 }) => {
    const [clickedId, setClickedId] = useState(0)
    const [clickedId1, setClickedId1] = useState(0)

    const handleClick = (item, id) => {
        setClickedId(id)
        doSomethingAfterClick(item)
    }
    const handleClick1 = (item1, id) => {
        setClickedId1(id)
        doSomethingAfterClick1(item1)
    }
    return (
        <View style={styles.distanc}>
            <Text style={styles.distanceT}>Radius(Km)</Text>
            <View style={styles.container}>
                {
                    buttons.map((buttonLabel, index) => {
                        return (
                            <TouchableOpacity
                                onPress={(item) => handleClick(item, index)}
                                key={index}
                                style={[
                                    index === clickedId ? styles.buttonActive : styles.button,
                                    index === 0 ? { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 } : "",
                                    index === 4 ? { borderTopRightRadius: 10, borderBottomRightRadius: 10 } : ""
                                ]}>
                                <Text
                                    style={index === clickedId ? styles.textAction : styles.text}>
                                    {buttonLabel}
                                </Text>
                            </TouchableOpacity>
                        )

                    })
                }

            </View>
            <Text style={styles.distanceT}>Time period(days ago)</Text>
            <View style={styles.container}>
                {
                    buttons1.map((buttonLabel, index) => {
                        return (
                            <TouchableOpacity
                                onPress={(item1) => handleClick1(item1, index)}
                                key={index}
                                style={[
                                    index === clickedId1 ? styles.buttonActive : styles.button,
                                    index === 0 ? { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 } : "",
                                    index === 4 ? { borderTopRightRadius: 10, borderBottomRightRadius: 10 } : ""
                                ]}>
                                <Text
                                    style={index === clickedId1 ? styles.textAction : styles.text}>
                                    {buttonLabel}
                                </Text>
                            </TouchableOpacity>
                        )

                    })
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 280,
        marginLeft: 13,
        marginTop: 5,
        elevation: 20,
    },
    button: {
        flex: 1,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'black',


    },
    buttonActive: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#184E4A',
        borderWidth: 0.5,
        borderColor: 'black'
    },
    text: {
        color: 'black'

    },
    textAction: {
        color: 'white'
    },
    species: {
        padding: 0,
        marginTop: 30,
        height: 150, width: 310,
        backgroundColor: '#FFFFFF',
        marginLeft: 38,
        borderRadius: 10,
        elevation: 20,
        borderColor: 'black'

    },
    speciesname: {
        color: 'black',
        fontWeight: 'regular',
        fontSize: 20,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10
    },
    distanc: {
        padding: 0,
        marginTop: 30,
        height: 270, width: 310,
        backgroundColor: '#FFFFFF',
        marginLeft: 38,
        borderRadius: 10,
        elevation: 20,
        borderColor: 'black'
    },
    distanceT: {
        fontWeight: 'regular',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 18,
        marginLeft: 10
    }
})
export default Setting