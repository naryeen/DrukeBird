import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const { width, height } = Dimensions.get('window');

const StartBirdingCounter = ({ Name, data, setData, item, setStartbirding1data }) => {

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
      <Button style={styles.plus} icon="minus-box-outline" onPress={() => handleButtonPress("decrease")} />
      <Text style={styles.countText}>{item.count}</Text>
      <Text style={styles.speciesText}>{Name}</Text>
      <Button style={styles.plus} icon="plus-box-outline" onPress={() => handleButtonPress("increase")} />
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
    height: hp('7%'),
    marginTop: hp('1%'),
  },
  countText: {
    marginTop: hp('2.5%'),
    fontWeight: "bold",
  },
  speciesText: {
    marginTop: hp('2.5%'),
    marginLeft: wp('2%'),
    fontSize: wp('4%'),
  },
  plus: {
    marginTop: hp('1.5%'),
  }
});

export default StartBirdingCounter;



