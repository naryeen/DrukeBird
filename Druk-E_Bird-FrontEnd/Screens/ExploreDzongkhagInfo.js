import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ExploreDzongkhagInfo({ route }) {
  const { dzongkhag } = route.params;
  const [birdData, setBirdData] = useState([]);
  const [birdNameCounts, setBirdNameCounts] = useState({});

  useEffect(() => {
    axios.get(getCheckList)
      .then((res) => {
        const filteredData = res.data.data.filter(item =>
          item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag === dzongkhag &&
          item.StartbirdingData[0]?.status === "submittedchecklist"
        );
        setBirdData(filteredData);

        // Calculate birdName counts
        const counts = {};
        filteredData.forEach(item => {
          const birdName = item.BirdName;
          const count = item.StartbirdingData[0]?.Totalcount || 0;
          counts[birdName] = (counts[birdName] || 0) + count;
        });
        setBirdNameCounts(counts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dzongkhag]);

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Dzongkhag: {dzongkhag}</Text>
      {Object.entries(birdNameCounts).map(([birdName, count]) => (
        <View key={birdName}>
          <Text>Bird Name: {birdName}</Text>
          <Text>Total Count: {count}</Text>
        </View>
      ))}
    </View>
  );
}

export default ExploreDzongkhagInfo;
