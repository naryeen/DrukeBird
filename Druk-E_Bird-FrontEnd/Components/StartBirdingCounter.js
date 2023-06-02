import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get('window');

const StartBirdingCounter = ({ Name, data, setData, item, setStartbirding1data}) => {

  const handleButtonPress = (action) => {
    const updatedData = data.map((dataItem) => {
      if (dataItem._id === item._id) {
        if (action === "increase") {
          return { ...dataItem, count: dataItem.count + 1 };
        } else if (action === "decrease" && dataItem.count > 0) {
          return { ...dataItem, count: dataItem.count - 1 };
        }
      }
      return dataItem;
    });
  
    setData(updatedData);
    const tempData = updatedData.map((item) => ({
      englishname: item.englishName,
      count: item.count,
    }));
    setStartbirding1data(tempData);
  };
  
  return (
    <View style={styles.container}>
      <Button style={styles.plus} icon="plus-box-outline" onPress={() => handleButtonPress("increase")}/>
      <Text style={styles.countText}>{item.count}</Text>
      <Text style={styles.speciesText}>{Name}</Text>
      <Button style={styles.plus} icon="minus-box-outline" onPress={() => handleButtonPress("decrease")}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 1,
    borderColor: "gray",
    elevation: 2,
    height: width*0.13,
    marginTop: width *0.02,
  },
  countText: {
    marginTop: width *0.032,
    fontWeight: "bold",
  },
  speciesText: {
    marginTop: width *0.032,
    marginLeft: width *0.02,
    fontSize: 16,
  },
  plus:{
    marginTop: width *0.03
  }
});

export default StartBirdingCounter;



