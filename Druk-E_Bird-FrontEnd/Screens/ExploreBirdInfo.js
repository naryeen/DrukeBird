import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Animated,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UnknownHeader from "../Components/UnknownHeader";
import { postCheckList } from "../Api/Api";
import Toast from 'react-native-root-toast';


const getCheckList = postCheckList;

function ExploreBirdInfo({ route }) {
  const { birdName } = route.params;

  const [birdData, setBirdData] = useState([]);
  const [dzongkhagCounts, setDzongkhagCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    axios
      .get(getCheckList)
      .then((res) => {
        const filteredData = res.data.data.filter(
          (item) =>
            item.BirdName === birdName &&
            item.StartbirdingData[0]?.status === "submittedchecklist"
        );
        setBirdData(filteredData);

        // Calculate dzongkhag counts
        const counts = {};
        filteredData.forEach((item) => {
          const dzongkhag =
            item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag;
          const count = item.StartbirdingData[0]?.Totalcount || 0;
          counts[dzongkhag] = (counts[dzongkhag] || 0) + count;
        });

        setDzongkhagCounts(counts);
        setIsLoading(false); // Data fetching complete
      })
      .catch((error) => {
        Toast.show(error, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER });
        
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [birdName]);

  const chartData = {
    labels: Object.keys(dzongkhagCounts),
    datasets: [
      {
        data: Object.values(dzongkhagCounts),
      },
    ],
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.green800}
          size="large"
        />
      </View>
    );
  }

  const topThreeCounts = Object.entries(dzongkhagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  const filteredDzongkhagCounts = Object.fromEntries(topThreeCounts);

  return (
    <View style={styles.container1}>
        <UnknownHeader title={"Bird Information"} />
        <Text style={styles.text}>Bird Name: {birdName}</Text>
        <Animated.View>
          <BarChart
            data={{
              labels: Object.keys(filteredDzongkhagCounts),
              datasets: [
                {
                  data: Object.values(filteredDzongkhagCounts),
                },
              ],
            }}
            width= {wp('90%')}
            height={wp('70%')}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: "#074643",
              backgroundGradientTo: "#136D66",
              decimalPlaces: 0,
              color: (opacity) => (opacity === 2 ? "#FFFFFF" : "#FFFFFF"),
            }}
            style={{
              marginVertical:  hp('1%'),
              borderRadius: 8,
              alignItems:"center"
            }}
          />
          <Text style={{ alignSelf: 'center', marginTop: hp("1%"), fontWeight: 'bold' }}>Dzongkhags vs Bird Counts</Text>
        </Animated.View>
        <ScrollView>
          {Object.entries(dzongkhagCounts).map(([dzongkhag, count]) => (
            <View key={dzongkhag} style={styles.container}>
              <Text style={styles.text1}>Dzongkhag: {dzongkhag}</Text>
              <Text style={styles.text1}>Total Count: {count}</Text>
              <View style={styles.horizontalLine} />
            </View>
          ))}
        </ScrollView>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  text: {
    marginTop: hp('2%'),
    marginLeft: wp('6%'),
    fontWeight: "bold",
    marginBottom: wp('1%'),
  },
  container: {
    marginHorizontal: wp('6%'),
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
    
  },
  text1: {
    marginTop: hp("1%"),
  },
  horizontalLine: {
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default ExploreBirdInfo;