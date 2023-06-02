import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, Animated, StyleSheet} from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import UnknownHeader from '../Components/UnknownHeader';

const getCheckList = 'https://druk-ebirds.onrender.com/api/v1/checkList';

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
            item.StartbirdingData[0]?.status === 'submittedchecklist'
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
        console.error('Error fetching data:', error);
        setIsLoading(false); // Data fetching failed
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;

  const topThreeCounts = Object.entries(dzongkhagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const filteredDzongkhagCounts = Object.fromEntries(topThreeCounts);

  return (
    <View>
      <UnknownHeader title={'Bird Information'} />
      <Text style={{ fontWeight: 'bold' }}>Bird Name: {birdName}</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <BarChart
          data={{
            labels: Object.keys(filteredDzongkhagCounts),
            datasets: [
              {
                data: Object.values(filteredDzongkhagCounts),
              },
            ],
          }}
          width={screenWidth}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#136D66',
            backgroundGradientFrom: '#136D66',
            backgroundGradientTo: '#136D66',
            decimalPlaces: 0,
            color: (opacity) => (opacity === 2 ? '#FFFFFF' : '#FFFFFF'),
            style: {
              borderRadius: 16,
            },
          }}
          style={{ marginVertical: 8 }}
        />
      </Animated.View>
      {Object.entries(dzongkhagCounts).map(([dzongkhag, count]) => (
        <View key={dzongkhag} style={styles.container}>
          <Text>Dzongkhag: {dzongkhag}</Text>
          <Text>Total Count: {count}</Text>
          <View style={styles.horizontalLine}/>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    marginBottom:15,

  },
  horizontalLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray', 
  }
});


export default ExploreBirdInfo;
