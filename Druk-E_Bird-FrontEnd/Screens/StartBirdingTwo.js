import React, { useState, useEffect, useContext } from "react";
import {FAB,ActivityIndicator,MD2Colors,Searchbar} from "react-native-paper";
import {StyleSheet,View,FlatList,Alert,Text,SafeAreaView,TouchableOpacity,} from "react-native";
import Toast from "react-native-root-toast";
import Button from "../Components/Button";
import { useNavigation} from "@react-navigation/native";
import axios from "axios";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";
import StartBirdingCounter from "../Components/StartBirdingCounter";
import { AuthContext } from "../Context/AuthContext";
import HeaderDateTimePicker from "../Components/HeaderDateTimePicker"
import { postCheckList } from "../Api/Api";
import { getSpeciesdata } from "../Api/Api";

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
  const name = userInfo.user.name;
  const { StartbirdingData } = route.params;
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 1000)
  );
  const [Isloading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSearch(query);
  }, [data, startbirding1data, query]);

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
          onPress: () =>
            navigation.navigate("UnknownBirds", {
              UnknownBirdsdata: UnknownBirdsdata,
            }),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    axios
      .get(getSpeciesdata)
      .then((res) => {
        const speciesData = res.data.species.map((item) => {
          // return {...item, count: 0}
          return { _id: item._id, englishName: item.englishName, count: 0 };
        });
        setData(speciesData);
        setFilteredData(speciesData);
      })
      .catch((error) => {
        Toast.show(error, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
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
  

  const handleItemClick = (itemId, birdName, StartbirdingData) => {
    navigation.navigate("BirdTypeInfo", {
      itemId: itemId,
      birdName: birdName,
      StartbirdingData: StartbirdingData,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          handleItemClick(
            item._id,
            item.englishName,
            route.params.StartbirdingData
          )
        }
      >
        <View style={styles.container1}>
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
      StartbirdingData: StartbirdingData,
      BirdName: "Unknown Birds",
    };
    handleFabPress(UnknownBirdsdata);
  };

  //data pass to SubmittingBirding
  const SubmittedBirdsdataSave = () => {
    var SubmittedBirdsdata = {
      StartbirdingData: StartbirdingData,
      startbirding1data: startbirding1data,
    };
    navigation.navigate("SubmittingBirding", {
      SubmittedBirdsdata: SubmittedBirdsdata,
    });
  };
  const StartbirdingonedataSave = () => {
    var detailOfBirds = [];
    var dataSubmitted = false;
    startbirding1data.map((bird) => {
      if (bird.count) {
        var temp = [
          {
            Totalcount: bird.count,
            currentLocation: StartbirdingData.currentLocation,
            selectedDate: StartbirdingData.selectedDate,
            selectedTime: StartbirdingData.selectedTime,
            observer: StartbirdingData.userName,
          },
        ];

        const StartbirdingoneData = {
          StartbirdingData: temp,
          BirdName: bird.englishname,
          CheckListName: `${name}-${randomNumber}`,
          userId: userId,
        };
        detailOfBirds.push(StartbirdingoneData);
        dataSubmitted = true;
      }
    });
    if (!dataSubmitted) {
      // Show the message that no data is submitted
      Alert.alert(
        "No Data Submitted",
        "Please select at least one bird count before stopping.",
        [{ text: "OK" }]
      );
      return;
    }
    setIsLoading(true);
    try {
      axios
        .post(
          postCheckList,
          detailOfBirds
        )
        .then((response) => {
          // Data successfully posted to the database
          Toast.show("Data successfully posted", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
        })
        .catch((error) => {
          Toast.show(error, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      Toast.show(error, { duration: Toast.durations.SHORT });
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
          inputStyle={{ paddingBottom: hp("0.1%") }}
          style={styles.searchbar}
        />

        {loading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.green800}
            size="large"
            style={{ marginVertical: hp("35%") }}
          />
        ) : (
          <>
            {!searchFound && searchQuery.length > 0 && (
              <Text style={styles.searchNotFoundText}>
                Can't find your bird name
              </Text>
            )}
            <FlatList
              style={{
                height: hp("75%"),
                borderRadius: 10,
              }}
              data={searchQuery.length > 0 ? filteredData : data}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
            />
          </>
        )}
        <View style={styles.buttonContianer}>
          <Button
            styling={styles.submitbutton}
            onPress={SubmittedBirdsdataSave}>Submit
          </Button>
          <FAB
          style={styles.fab}
          small
          color="white"
          icon="plus"
          onPress={UnknownBirdsdataSave}
        />
          <Button styling={styles.stopbutton} onPress={StartbirdingonedataSave}>
            Stop
          </Button>
        </View>
        {Isloading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.green800}
              size="large"
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flexDirection: "column",
    marginHorizontal: wp("4%"),
  },

  buttonContianer: {
    flexDirection: "row",
    marginTop: hp("1%"),
    marginHorizontal: wp("4%"),
    justifyContent: "space-between",
    alignItems: "center",
  },

  submitbutton: {
    width: wp("35%"),
    height: hp("7%"),
    borderRadius: 7,
    marginRight: wp("2%"),

  },
  stopbutton: {
    width: wp("35%"),
    height: hp("7%"),
    borderRadius: 7,
    marginLeft: wp("2%"),
  },
  fab: {
    width: wp("15%"),
    height: hp("7%"),
    alignItems:'center',
    backgroundColor: "#136D66",
    borderRadius: 7,

  },
  searchbar: {
    marginTop: hp("1%"),
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "#E2DFD2",
    marginHorizontal: wp("4%"),
  },
  searchNotFoundText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: hp("2%"),
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
});
export default StartBirdingTwo;