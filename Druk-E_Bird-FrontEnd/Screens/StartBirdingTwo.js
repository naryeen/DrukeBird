import React, { useState, useEffect, useContext } from "react";
import { FAB, ActivityIndicator, MD2Colors, Searchbar} from "react-native-paper";
import { StyleSheet, View, FlatList, Alert, Text, SafeAreaView, TouchableOpacity, ToastAndroid } from "react-native";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import StartBirdingCounter from "../Components/StartBirdingCounter";
import { AuthContext } from "../Context/AuthContext";
import HeaderDateTimePicker from "../Components/HeaderDateTimePicker"
const StartBirdingone = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startbirding1data, setStartbirding1data] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchFound, setSearchFound] = useState(true);
  const [query, setQuery] = useState("");
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name
  const { StartbirdingData } = route.params;


  useEffect(() => {
    handleSearch(query);
  }, [data, startbirding1data]);

  useEffect(() => {
    StartbirdingData;
    //console.log(StartbirdingData);
  }, [StartbirdingData]);

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
          // navigation.navigate('StartBirdingone', { StartbirdingData: StartbirdingData });
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
          data={searchQuery.length > 0 ? filteredData : data}
          setData={setData}
          setStartbirding1data={setStartbirding1data}
        />
      </View>
    );
  };

  //data pass to unknown birds
  const UnknownBirdsdataSave = () => {
    var UnknownBirdsdata = {
      StartbirdingData:StartbirdingData,
      BirdName:"Unknown Birds"
    };
    handleFabPress(UnknownBirdsdata);
    console.log(UnknownBirdsdata)
  };

  //data pass to SubmittingBirding
  const SubmittedBirdsdataSave = () => {
    var SubmittedBirdsdata = {
      StartbirdingData:StartbirdingData,
      startbirding1data:startbirding1data
    };
    navigation.navigate('SubmittingBirding', { SubmittedBirdsdata: SubmittedBirdsdata });
    // console.log(SubmittedBirdsdata);
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
          "observer":StartbirdingData.userName
        }]
        const randomNumber = Math.floor(Math.random() * 1000);

        const StartbirdingoneData = {
          "StartbirdingData": temp,
          "BirdName": bird.englishname,
          "CheckListName":`${name}-${randomNumber}`
        };
        detailOfBirds.push(StartbirdingoneData)

      }
      
    })
    
    try {
      // Make an HTTP POST request to your backend API endpoint
      axios
        .post("https://druk-ebirds.onrender.com/api/v1/checkList", detailOfBirds)
        .then((response) => {
          console.log(detailOfBirds);
          // Data successfully posted to the database
        ToastAndroid.show('Data successfully posted', ToastAndroid.LONG);
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
          onPress={UnknownBirdsdataSave}
        />
        <View style={styles.buttonContianer}>
          <Button styling={styles.submitbutton} onPress={SubmittedBirdsdataSave}>Submit</Button>
          <Button styling={styles.stopbutton} onPress={StartbirdingonedataSave}>Stop</Button>
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