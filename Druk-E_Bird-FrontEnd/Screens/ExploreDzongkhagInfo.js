// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// import axios from 'axios';

// const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

// function ExploreInfo({ route }) {
//   const { dzongkhag } = route.params;
//   const [birdData, setBirdData] = useState([]);

//   useEffect(() => {
//     axios.get(getCheckList)
//       .then((res) => {
//         const filteredData = res.data.data.filter(item => 
//           item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag === dzongkhag
//         );
//         setBirdData(filteredData);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [dzongkhag]);

//   return (
//     <View style={{marginTop:100}}>
//       <Text>Dzongkhag: {dzongkhag}</Text>
//       {birdData.map((item, index) => (
//         <View key={index}>
//           <Text>Bird Name: {item.BirdName}</Text>
//           <Text>Count: {item.StartbirdingData[0]?.count}</Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// export default ExploreInfo;

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

const getCheckList = "https://druk-ebirds.onrender.com/api/v1/checkList";

function ExploreInfo({ route }) {
  const { dzongkhag } = route.params;
  const [birdData, setBirdData] = useState([]);

  useEffect(() => {
    axios.get(getCheckList)
      .then((res) => {
        const filteredData = res.data.data.filter(item =>
          item.StartbirdingData[0]?.EndpointLocation[0]?.dzongkhag === dzongkhag &&
          item.StartbirdingData[0]?.status === "submittedchecklist"
        );
        setBirdData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dzongkhag]);

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Dzongkhag: {dzongkhag}</Text>
      {birdData.map((item, index) => (
        <View key={index}>
          <Text>Bird Name: {item.BirdName}</Text>
          <Text>Count: {item.StartbirdingData[0]?.count}</Text>
        </View>
      ))}
    </View>
  );
}

export default ExploreInfo;

