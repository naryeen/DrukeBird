import React, { useState, useEffect } from "react";
import { FAB, ActivityIndicator, MD2Colors, Searchbar, ToastAndroid } from "react-native-paper";
import { StyleSheet, View, FlatList, Alert, Text, SafeAreaView, TouchableOpacity} from "react-native";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import StartBirdingCounter from "../Components/StartBirdingCounter";

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const StartBirdingone = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [startbirding1data, setStartbirding1data] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchFound, setSearchFound] = useState(true);
  const [query, setQuery] = useState("");
  const { StartbirdingData } = route.params;


  useEffect(() => {
    //console.log(seconds);
  }, [seconds]);

  useEffect(() => {
    handleSearch(query);
  }, [data, startbirding1data]);

  useEffect(() => {
    StartbirdingData;
    //console.log(StartbirdingData);
  }, [StartbirdingData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, fontSize: 18 }}>
            {formatTime(seconds)}
          </Text>
        </View>),
    });
  }, [navigation, seconds]);

  const handleFabPress = () => {
    Alert.alert(
      "Alert ",
      "Do you want to add the unknown birds?",
      [
        {
          text: "NO",
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => navigation.navigate("UnknownBirds"),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    axios
      .get("https://druk-ebird.onrender.com/api/v1/species?limit=40")
      .then((res) => {
        const speciesData = res.data.species.map((item) => ({
          ...item,
          count: 0,
        }));

        setData(speciesData);
        setFilteredData(speciesData);
      })
      .catch((error) => {
        console.log("API call error");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    const filtered = data.filter((item) =>
      item.englishName.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredData(filtered);
    setSearchFound(filtered.length > 0);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <StartBirdingCounter
          Name={item.englishName}
          item={item}
          //data = {data}
          data={searchQuery.length > 0 ? filteredData : data}
          setData={setData}
          setStartbirding1data={setStartbirding1data}
        />
      </View>
    );
  };

  const StartbirdingonedataSave = () => {

    var detailOfBirds = []
    startbirding1data.map((bird) => {
      if (bird.count) {
        var temp = [{
          "count": bird.count,
          "currentLocation": StartbirdingData.currentLocation,
          "selectedDate": StartbirdingData.selectedDate,
          "selectedTime": StartbirdingData.selectedTime,
        }]

        const StartbirdingoneData = {
          "StartbirdingData": temp,
          "BirdName": bird.englishname,
        };
        detailOfBirds.push(StartbirdingoneData)
      }
    })

    try {
      // Make an HTTP POST request to your backend API endpoint
      axios
        .post("https://druk-ebirds.onrender.com/api/v1/checkList", detailOfBirds)
        .then((response) => {
          // Data successfully posted to the database
        //   ToastAndroid.show('Data successfully posted', 
        // ToastAndroid.LONG);
          console.log("Data post:", response.data);
        })
        .catch((error) => {
          console.error("Error post data:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>

      <Searchbar
        placeholder="Search any birds"
        onChangeText={(text) => {
          setQuery(text);
          handleSearch(text);
        }}
        value={searchQuery}
        inputStyle={{ paddingBottom: 19 }}
        style={styles.searchbar}/>

        {loading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.green800}
            size="large"
            style={{ marginTop: 250, marginBottom: 250 }}
          />
        ) : (
          <>
          {!searchFound && searchQuery.length > 0 && (
            <Text style={styles.searchNotFoundText}>Can't find your bird name</Text>
          )}
          <FlatList
            style={{ height: "70%", marginTop: 10, borderRadius: 10 }}
            //data={data}
            data={searchQuery.length > 0 ? filteredData : data}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
          </>
        )}
        <FAB
          style={styles.fab}
          small
          color="white"
          icon="plus"
          onPress={handleFabPress}
        />
        <View style={styles.buttonContianer}>
          <Button styling={styles.submitbutton} onPress={StartbirdingonedataSave}>Submit</Button>
          <Button styling={styles.stopbutton}>Stop</Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  buttonContianer: {
    flexDirection: "row",
    marginTop: 10,
  },
  submitbutton: {
    width: 163,
    marginRight: 10,
    height: 50,
    borderRadius: 7,
  },
  stopbutton: {
    width: 163,
    marginLeft: 10,
    height: 50,
    borderRadius: 7,
  },
  fab: {
    marginLeft: 290,
    marginTop: 10,
    right: 0,
    bottom: 0,
    backgroundColor: "#136D66",
  },
  searchbar: {
    marginTop: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  searchNotFoundText:{
    fontSize:16,
    textAlign:'center',
    fontWeight:'bold',
    marginTop:30
  }
});

export default StartBirdingone;