import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ExploreBirdInfo({ route }) {
  const { birdName } = route.params;

  const [birdData, setBirdData] = useState([]);
  const [dzongkhagCounts, setDzongkhagCounts] = useState({});

  useEffect(() => {
    axios.get(getCheckList)
      .then((res) => {
        const filteredData = res.data.data.filter(item =>
          item.BirdName === birdName && item.StartbirdingData[0]?.status === "submittedchecklist"
        );
        setBirdData(filteredData);

        // Calculate dzongkhag counts
        const counts = {};
        filteredData.forEach(item => {
          const dzongkhag = item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag;
          const count = item.StartbirdingData[0]?.Totalcount || 0;
          counts[dzongkhag] = (counts[dzongkhag] || 0) + count;
        });
        setDzongkhagCounts(counts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [birdName]);

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Bird Name: {birdName}</Text>
      {Object.entries(dzongkhagCounts).map(([dzongkhag, count]) => (
        <View key={dzongkhag}>
          <Text>Dzongkhag: {dzongkhag}</Text>
          <Text>Total Count: {count}</Text>
        </View>
      ))}
    </View>
  );
}

export default ExploreBirdInfo;
