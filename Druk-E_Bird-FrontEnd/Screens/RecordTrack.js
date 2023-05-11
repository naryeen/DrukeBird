import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text} from 'react-native';

const RecordTrack = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
    <Text style={{fontSize:16, fontWeight:'bold'}}>Record Track</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#767577' }}
        thumbColor={isEnabled ? '#24B78B' : '#136D66'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    marginTop:18
  },
});

export default RecordTrack;
