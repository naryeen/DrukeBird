import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text,Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Components/Button';
import Toast from 'react-native-root-toast'; // Add this import
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator,MD2Colors} from 'react-native-paper';
import BhutanDzongkhags from '../Components/BhutanDzongkha';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const DraftCheckListSubmitted = ({ route }) => {
  const { checklistdata } = route.params;
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.user.name;
  const userId = userInfo.user._id;
  const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
  const [selectedGewog, setSelectedGewog] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [gewogOptions, setGewogOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 1000));
  const [loading, setLoading] = useState(false);

  const handleDzongkhagChange = (value) => {
    setSelectedDzongkhag(value);
    setSelectedGewog('');
    setSelectedVillage('');
    setVillageOptions([]);

    const gewogs = BhutanDzongkhags[value];
    const gewogOptions = Object.keys(gewogs);
    setGewogOptions(gewogOptions);
  };

  const handleGewogChange = (value) => {
    setSelectedGewog(value);
    setSelectedVillage('');

    const villages = BhutanDzongkhags[selectedDzongkhag][value];
    const villageOptions = villages.map((village) => ({ label: village, value: village }));
    setVillageOptions(villageOptions);
  };

  const birdsWithCount = checklistdata && checklistdata.StartbirdingData && checklistdata.StartbirdingData.Totalcount > 0 ? [checklistdata] : [];
  const StartbirdingonedataSave = () => {
    if (!selectedDzongkhag) {
      Toast.show("Please select Dzongkha", {duration: Toast.durations.SHORT});
      return;
    }
    else if(!selectedGewog)
    {
      Toast.show("Please select Gewong", {duration: Toast.durations.SHORT});
      return;
    }
    else if(!selectedVillage){
      Toast.show("Please select Village", {duration: Toast.durations.SHORT});
      return;
    }

    var detailOfBirds = [];
    var dataSubmitted = false;
    var endpointLocation = {
      dzongkhag: selectedDzongkhag,
      gewog: selectedGewog,
      village: selectedVillage,
    };
    var temp = [
    {
        Totalcount: checklistdata.StartbirdingData.Totalcount,
        selectedDate: checklistdata.StartbirdingData.selectedDate,
        selectedTime: checklistdata.StartbirdingData.selectedTime,
        observer: checklistdata.StartbirdingData.userName,
        EndpointLocation: [endpointLocation],
        "status":"submittedchecklist"
    },
];
    const StartbirdingoneData = {
        StartbirdingData: temp,
        BirdName: checklistdata.birdName,
        CheckListName: `${name}-${randomNumber}`,
        "userId":userId};
        detailOfBirds.push(StartbirdingoneData);
        dataSubmitted = true;

    if (!dataSubmitted) {
      // Show the message that no data is submitted
      Alert.alert("No Data Submitted", "Please select at least one bird count before submitting", [{ text: "OK" }]);
      return;
    }
    setLoading(true);
    try {
      console.log('detailOfBirds', detailOfBirds);
      axios
        .post('https://druk-ebirds.onrender.com/api/v1/checkList', detailOfBirds)
        .then((response) => {
          // Data successfully posted to the database
          Toast.show("Data successfully posted", {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
        })
        .catch((error) => {
          Toast.show(error, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});

        })
        .finally(() => {setLoading(false);});
    } catch (error) {
        Toast.show(error, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Dzongkhag:</Text>
      <Picker
        selectedValue={selectedDzongkhag}
        onValueChange={handleDzongkhagChange}
        style={styles.picker}
      >
        <Picker.Item label="Select Dzongkhag" value="" />
        {Object.keys(BhutanDzongkhags).map((dzongkhag) => (
          <Picker.Item key={dzongkhag} label={dzongkhag} value={dzongkhag} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Gewog:</Text>
      <Picker
        selectedValue={selectedGewog}
        onValueChange={handleGewogChange}
        enabled={selectedDzongkhag !== ''}
        style={styles.picker}
      >
        <Picker.Item label="Select Gewog" value="" />
        {gewogOptions.map((gewog) => (
          <Picker.Item key={gewog} label={gewog} value={gewog} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Village:</Text>
      <Picker
        selectedValue={selectedVillage}
        onValueChange={setSelectedVillage}
        enabled={selectedDzongkhag !== '' && selectedGewog !== ''}
        style={styles.picker}
      >
        <Picker.Item label="Select Village" value="" />
        {villageOptions.map((village) => (
          <Picker.Item key={village.value} label={village.label} value={village.value} />
        ))}
      </Picker>

{birdsWithCount.length > 0 ? (
  <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>
    Number of observed <Icon name="twitter" size={30} color="#000" />: {birdsWithCount.length}
  </Text>
) : (
  <Text>No birds with count greater than 0.</Text>
)}

{birdsWithCount.map((bird) => (
  <Text key={bird.itemId}>
    {bird.birdName} : {bird.StartbirdingData ? bird.StartbirdingData.Totalcount : 0}
  </Text>
))}
    <Button styling={styles.buttonstyle} onPress={StartbirdingonedataSave}>Continue</Button>
    {loading && (
        <View style={styles.loadingContainer}>
           <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  inputStyle: {
    marginTop: 20,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 321,
  },
  buttonstyle: {
    marginTop: 150,
    width: 321,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    width: 200,
    height: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

export default DraftCheckListSubmitted;


