import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import bhutanDzongkhags from '../components/bhutanDzongkhags';

const BhutanLocationSelector = () => {
  const [selectedDzongkhag, setSelectedDzongkhag] = useState('');
  const [selectedGewog, setSelectedGewog] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [gewogOptions, setGewogOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);

  const handleDzongkhagChange = (value) => {
    setSelectedDzongkhag(value);
    setSelectedGewog('');
    setSelectedVillage('');
    setVillageOptions([]);

    const gewogs = bhutanDzongkhags[value];
    const gewogOptions = Object.keys(gewogs);
    setGewogOptions(gewogOptions);
  };

  const handleGewogChange = (value) => {
    setSelectedGewog(value);
    setSelectedVillage('');

    const villages = bhutanDzongkhags[selectedDzongkhag][value];
    const villageOptions = villages.map((village) => ({ label: village, value: village }));
    setVillageOptions(villageOptions);
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
        {Object.keys(bhutanDzongkhags).map((dzongkhag) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
});

export default BhutanLocationSelector;
