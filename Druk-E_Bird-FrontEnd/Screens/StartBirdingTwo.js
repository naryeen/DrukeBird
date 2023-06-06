import React, { useState, useEffect, useContext } from "react";
import { FAB, ActivityIndicator, MD2Colors, Searchbar} from "react-native-paper";
import { StyleSheet, View, FlatList, Alert, Text, SafeAreaView, TouchableOpacity} from "react-native";
import Toast from 'react-native-root-toast'; 
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import StartBirdingCounter from "../Components/StartBirdingCounter";
import { AuthContext } from "../Context/AuthContext";
import HeaderDateTimePicker from "../Components/HeaderDateTimePicker"


const StartBirdingTwo = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startbirding1data, setStartbirding1data] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchFound, setSearchFound] = useState(true);
  const [query, setQuery] = useState("");
  const { userInfo } = useContext(AuthContext);
  const userId = userInfo.user._id;
  const name = userInfo.user.name
  const { StartbirdingData} = route.params;
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 1000));
  const [Isloading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSearch(query);
  }, [data, startbirding1data]);

  const handleFabPress = (UnknownBirdsdata) => {
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
          onPress: () => navigation.navigate("UnknownBirds", { UnknownBirdsdata: UnknownBirdsdata }),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    axios
      .get("https://druk-ebird.onrender.com/api/v1/species?limit=20")
      .then((res) => {
        const speciesData = res.data.species.map((item) => {
          // return {...item, count: 0}
          return {_id: item._id,
            englishName: item.englishName,
            count: 0}
        });
        setData(speciesData);
        setFilteredData(speciesData);
        console.log(speciesData.length)
      })
      .catch((error) => {
        Toast.show(error, {duration: Toast.durations.SHORT});
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      const filtered = data.filter((item) =>
        item.englishName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setSearchFound(filtered.length > 0);
    }
  };

  const handleItemClick = (itemId, birdName, StartbirdingData) => {
    navigation.navigate('BirdTypeInfo', { itemId: itemId, birdName: birdName, StartbirdingData: StartbirdingData});
  };
  
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleItemClick(item._id, item.englishName, route.params.StartbirdingData)}>
        <View>
          <StartBirdingCounter
            Name={item.englishName}
            item={item}
            data={searchQuery.length > 0 ? filteredData : data}
            setData={setData}
            setStartbirding1data={setStartbirding1data}
          />
        </View>
      </TouchableOpacity>
    );
  };

  //data pass to unknown birds
  const UnknownBirdsdataSave = () => {
    var UnknownBirdsdata = {
      StartbirdingData:StartbirdingData,
      BirdName:"Unknown Birds"
    };
    handleFabPress(UnknownBirdsdata);
  };

  //data pass to SubmittingBirding
  const SubmittedBirdsdataSave = () => {
    var SubmittedBirdsdata = {
      StartbirdingData:StartbirdingData,
      startbirding1data:startbirding1data
    };
    navigation.navigate('SubmittingBirding', { SubmittedBirdsdata: SubmittedBirdsdata });
  };
  const StartbirdingonedataSave = () => {

    var detailOfBirds = []
    var dataSubmitted = false;
    startbirding1data.map((bird) => {
      if (bird.count) {
        var temp = [{
          "Totalcount": bird.count,
          "currentLocation": StartbirdingData.currentLocation,
          "selectedDate": StartbirdingData.selectedDate,
          "selectedTime": StartbirdingData.selectedTime,
          "observer":StartbirdingData.userName
        }]

        const StartbirdingoneData = {
          "StartbirdingData": temp,
          "BirdName": bird.englishname,
          "CheckListName":`${name}-${randomNumber}`,
          "userId":userId
        };
        detailOfBirds.push(StartbirdingoneData)
        dataSubmitted = true;
      }
      
    });
    if (!dataSubmitted) {
      // Show the message that no data is submitted
      Alert.alert("No Data Submitted", "Please select at least one bird count before stopping.", [{ text: "OK" }]);
      return;
    }
    setIsLoading(true);
    try {
      // Make an HTTP POST request to your backend API endpoint
      console.log(detailOfBirds)
      axios
        .post("https://druk-ebirds.onrender.com/api/v1/checkList", detailOfBirds)
        .then((response) => {
          // Data successfully posted to the database
          Toast.show("Data successfully posted", {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
        })
        .catch((error) => {
          Toast.show(error, {duration: Toast.durations.SHORT});

        })
        .finally(() => {setIsLoading(false);});
    } catch (error) {
      Toast.show(error, {duration: Toast.durations.SHORT});
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderDateTimePicker/>
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
          onPress={UnknownBirdsdataSave}
        />
        <View style={styles.buttonContianer}>
          <Button styling={styles.submitbutton} onPress={SubmittedBirdsdataSave}>Submit</Button>
          <Button styling={styles.stopbutton} onPress={StartbirdingonedataSave}>Stop</Button>
        </View>
        {Isloading && (
          <View style={styles.loadingContainer}>
           <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
        </View>
      )}
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
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default StartBirdingTwo;