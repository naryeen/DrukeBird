import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Animated,
  ScrollView,
} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import UnknownHeader from "../Components/UnknownHeader";
import Toast from "react-native-root-toast";

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ExploreDzongkhagInfo({ route }) {
  const { dzongkhag } = route.params;
  const [birdData, setBirdData] = useState([]);
  const [birdNameCounts, setBirdNameCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(getCheckList)
      .then((res) => {
        const filteredData = res.data.data.filter(
          (item) =>
            item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag ===
              dzongkhag &&
            item.StartbirdingData[0]?.status === "submittedchecklist"
        );
        setBirdData(filteredData);

        // Calculate birdName counts
        const counts = {};
        filteredData.forEach((item) => {
          const birdName = item.BirdName;
          const count = item.StartbirdingData[0]?.Totalcount || 0;
          counts[birdName] = (counts[birdName] || 0) + count;
        });
        setBirdNameCounts(counts);
        setIsLoading(false); // Data fetching complete
      })
      .catch((error) => {
        Toast.show(error, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
})
      .finally(() => {setIsLoading(false);});
  }, [dzongkhag]);

  const chartData = {
    labels: Object.keys(birdNameCounts),
    datasets: [
      {
        data: Object.values(birdNameCounts),
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

  const topThreeCounts = Object.entries(birdNameCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const filteredBirdNameCounts = Object.fromEntries(topThreeCounts);

  return (
    <View style={styles.container1}>
      <UnknownHeader title={"Birding Sites"} />

      <Text style={styles.text}>Dzongkhag: {dzongkhag}</Text>
      <Animated.View style={styles.graph}>
        <BarChart
          data={{
            labels: Object.keys(filteredBirdNameCounts),
            datasets: [
              {
                data: Object.values(filteredBirdNameCounts),
                color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
              },
            ],
          }}
          width={wp("90%")}
          height={wp("70%")}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "#074643",
            backgroundGradientTo: "#136D66",
            decimalPlaces: 0,
            color: (opacity) => (opacity === 1 ? "#FFFFFF" : "#FFFFFF"),
          }}
          style={{
            marginVertical: hp("1%"),
            borderRadius: 8,
            alignItems: "center",
          }}
          fromZero={true}
          animation={{
            duration: 1500,
            easing: "easeOutQuad",
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            marginTop: hp("1%"),
            fontWeight: "bold",
          }}
        >
          Birds vs Bird Counts
        </Text>
      </Animated.View>
      <ScrollView>
        {Object.entries(birdNameCounts).map(([birdName, count]) => (
          <View key={birdName} style={styles.container}>
            <Text style={styles.text1}>Bird Name: {birdName}</Text>
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
    marginTop: hp("2%"),
    marginLeft: wp("6%"),
    fontWeight: "bold",
    marginBottom: wp("1%"),
  },
  container: {
    marginHorizontal: wp("6%"),
    marginBottom: hp("2%"),
    marginTop: hp("2%"),
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

export default ExploreDzongkhagInfo;