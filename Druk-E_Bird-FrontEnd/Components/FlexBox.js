import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';  
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function FlexTrail(){
    return(
        <View>
            <View>
                <Text style={styles.header1}>Start Checklist</Text>
                    <View style={styles.cont1}>
                        <View >
                            <Text style={styles.textbody1}>Before selecting the birds,      
                                you need to select date and time. If you are about to begin birding, 
                                use the current date and time or you can adjust these values to previous time period.
                            </Text>
                        </View>

                        <View style={styles.icon1}>
                        <FontAwesome5 name="list-alt" size={24} color="#4A2C2C" />               
                        </View>
                    </View>
            </View>

            <View>
                <Text style={styles.header2}>Record Tracks</Text>

                    <View style={styles.cont2}>
                        <View >
                            
                            <Text style={styles.textbody1}>Record tract is selected by default. Tracks will keep 
                            an automated GPS path of your route and record your 
                            distance traveled and time spent in this application so you can focus on birding.
                            </Text>
                        </View>
                        
                        <View style={styles.icon2}>
                            <MaterialCommunityIcons name="ray-start" size={24} color="black"style={styles.icons} />              
                        </View>
                    </View>
            </View>
            

            <View>
                <Text style={styles.header3}>Select a location</Text>

                    <View style={styles.cont3}>
                        <View >
                            
                            <Text style={styles.textbody1}> At any time during the checklist you can select an exact location 
                                for a more precise list of birds in your area. 
                                You must select a location before you submit your checklist.
                            </Text>
                        </View>
                        
                        <View style={styles.icon3}>
                        <Ionicons name="ios-location-sharp" size={24} color="#4E4D4D" />             
                        </View>
                    </View>
            </View>

            <View>
                <Text style={styles.header4}>Start birding</Text>

                    <View style={styles.cont4}>
                        <View >
                            
                            <Text style={styles.textbody1}> Once the date, time, and tracks are set, tap "Start New Checklist". 
                                Now we're at the fun part—reporting your bird sightings! Enter every bird 
                                that you see or hear and the numbers of each species. Tap on a bird's 
                                name to enter and add some detials on particular species.
                            </Text>
                        </View>
                        
                        <View style={styles.icon4}>
                            <MaterialIcons name="filter-9-plus" size={24} color="#472F34" />            
                        </View>
                    </View>
            </View>

            <View>
                <Text style={styles.header5}>Review & Submit</Text>

                    <View style={styles.cont5}>
                        <View >
                            
                            <Text style={styles.textbody1}> 
                                When you are done birding, tap "Submit" to generate a summary of your  checklist.
                            </Text>
                        </View>
                        
                        
                    </View>
            </View>
            
        </View>

        
    );
}

const styles = StyleSheet.create({
    header1:  {
        
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    cont1: { 
        justifyContent:'space-around',
        
        height:100,
        width:300,
        paddingLeft:40,
        flexDirection: 'row',
        
    },
    icon1:{
        paddingLeft:50,
    },
    
    header2:{

        paddingLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    cont2:{
        justifyContent:'space-around',
        
        height:100,
        width:300,
        paddingLeft:40,
        flexDirection: 'row',
    },
    icon2:{
        paddingLeft:50,
    },
    header3:{

        paddingLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    cont3:{
        justifyContent:'space-around',
        
        height:100,
        width:300,
        paddingLeft:40,
        flexDirection: 'row',
    },
    icon3:{
        paddingLeft:50,
    },

    header4:{

        paddingLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    cont4:{
        justifyContent:'space-around',
        
        height:100,
        width:300,
        paddingLeft:40,
        flexDirection: 'row',
    },
    icon4:{
        paddingLeft:50,
        alignItems:'center',
    },

    header5:{

        paddingLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:10,
    },
    cont5:{
        justifyContent:'space-around',
        
        height:100,
        width:300,
        paddingLeft:20,
        flexDirection: 'row',
    },
});