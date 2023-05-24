import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';  
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FlexTrail() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Start Checklist</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            Before selecting the birds, you need to select date and time. If you are about to begin birding, use the current date and time or you can adjust these values to previous time period.
          </Text>
          <View style={styles.icon}>
            <FontAwesome5 name="list-alt" size={24} color="#4A2C2C" />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.header}>Record Tracks</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            Record track is selected by default. Tracks will keep an automated GPS path of your route and record your distance traveled and time spent in this application so you can focus on birding.
          </Text>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="ray-start" size={24} color="black" />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.header}>Select a Location</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            At any time during the checklist, you can select an exact location for a more precise list of birds in your area. You must select a location before you submit your checklist.
          </Text>
          <View style={styles.icon}>
            <Ionicons name="ios-location-sharp" size={24} color="#4E4D4D" />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.header}>Start Birding</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            Once the date, time, and tracks are set, tap "Start New Checklist". Now we're at the fun part—reporting your bird sightings! Enter every bird that you see or hear and the numbers of each species. Tap on a bird's name to enter and add some details on a particular species.
          </Text>
          <View style={styles.icon}>
            <MaterialIcons name="filter-9-plus" size={24} color="#472F34" />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.header}>Review & Submit</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            When you are done birding, tap "Submit" to generate a summary of your checklist.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textbody: {
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
  },
});