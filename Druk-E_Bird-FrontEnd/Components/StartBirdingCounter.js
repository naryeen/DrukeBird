import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

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
      <Button
        icon="plus-box-outline"
        onPress={() => handleButtonPress("increase")}
      />
      <Text style={styles.countText}>{item.count}</Text>
      <Text style={styles.speciesText}>{Name}</Text>
      <Button icon="minus-box-outline" onPress={() => handleButtonPress("decrease")}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    marginTop: 10,
  },
  countText: {
    marginTop: 10,
    fontWeight: "bold",
  },
  speciesText: {
    marginTop: 7,
    marginLeft: 20,
    fontSize: 16,
  },
});

export default StartBirdingCounter;
