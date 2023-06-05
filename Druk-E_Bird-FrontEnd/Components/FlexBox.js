import React from "react";
import { StyleSheet, Text, View} from "react-native";


export default function FlexTrail() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Start Checklist</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            Before selecting the birds, you need to select date and time. If you
            are about to begin birding, use the current date and time or you can
            adjust these values to previous time period.
            {"\n\n"}
            Once the date, time, and tracks are set, tap "Start Checklist". Now
            we're at the fun part—reporting your bird sightings! Enter every
            bird that you see and the numbers of each species. Tap on a bird's
            name to enter and add some details including the bird photo of a
            particular species.
            {"\n\n"}
            You also have the option to pause birding, and your checklist
            summary will be saved as a draft, allowing you to submit it at a
            later time.
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.header}>Record Tracks</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            Record track is selected by default. This will record the Latitude
            and Longitude of the current location.
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.header}>Select a Location</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            You must select a location before you submit your checklist. You
            will be provided with options to choose Dzongkhag, Gewog and
            Village.
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.header}>Unknown Birds</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            Even if you are unfamiliar with the name of the bird, you have the
            option to select "UnknownBird" and submit the checklist. The
            administrators will verify the unidentified bird, and you will be
            able to view its name from the "Unknown Verification" section.
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.header}>Explore</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            The Explore feature allows you to search for specific birds or
            birding sites based on the checklists submitted by all users.
            Additionally, it provides a graph displaying the top three bird
            species and birding sites, as determined by the checklists
            submitted.
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.header}>Checklist</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.textbody}>
            Once you have submitted a checklist, you will be able to access and
            view all the checklists you have submitted in the "Checklist"
            section. This section will also include any draft checklists that
            you can choose to submit at a later time.
          </Text>
        </View>
      </View>
    </View>
  );
}

import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP('5%'),
    justifyContent: 'space-between',
  },
  header: {
    fontSize: widthPercentageToDP('4%'),
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: heightPercentageToDP('2%'),
  },
  textbody: {
    flex: 1,
    marginRight: widthPercentageToDP('2%'),
    textAlign: 'justify',
  },
  icon: {
    marginLeft: widthPercentageToDP('2%'),
  },
});