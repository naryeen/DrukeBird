import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import UnknownHeader from '../Components/UnknownHeader';

const getCheckList = 'https://druk-ebirds.onrender.com/api/v1/checkList';

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
            item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag === dzongkhag &&
            item.StartbirdingData[0]?.status === 'submittedchecklist'
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
        console.error('Error fetching data:', error);
        setIsLoading(false); // Data fetching failed
      });
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;

  const topThreeCounts = Object.entries(birdNameCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const filteredBirdNameCounts = Object.fromEntries(topThreeCounts);

  return (
    <View>
            <UnknownHeader title={'Birding Sites'} />

      <Text style={{ fontWeight: 'bold' }}>Dzongkhag: {dzongkhag}</Text>
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
        width={screenWidth}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#136D66',
          backgroundGradientFrom: '#136D66',
          backgroundGradientTo: '#136D66',
          decimalPlaces: 0,
          color: (opacity) => (opacity === 1 ? '#FFFFFF' : '#FFFFFF'),
          style: {
            borderRadius: 16,
          },
        }}
        style={{ marginVertical: 8 }}
        fromZero={true}
        animation={{
          duration: 1500,
          easing: 'easeOutQuad',
        }}
      />
      {Object.entries(birdNameCounts).map(([birdName, count]) => (
        <View key={birdName} style={styles.container}>
          <Text>Bird Name: {birdName}</Text>
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

export default ExploreDzongkhagInfo;
