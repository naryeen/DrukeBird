import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ExploreBirdInfo({ route }) {
  const { birdName } = route.params;

  const [birdData, setBirdData] = useState([]);

  useEffect(() => {
    axios.get(getCheckList)
      .then((res) => {
        const filteredData = res.data.data.filter(item =>
          item.BirdName === birdName && item.StartbirdingData[0]?.status === "submittedchecklist"
        );
        setBirdData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [birdName]);

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Bird Name: {birdName}</Text>
      {birdData.map((item, index) => (
        <View key={index}>
          <Text>Dzongkhag: {item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag}</Text>
          <Text>Count: {item.StartbirdingData[0]?.Totalcount}</Text>
        </View>
      ))}
    </View>
  );
}

export default ExploreBirdInfo;
