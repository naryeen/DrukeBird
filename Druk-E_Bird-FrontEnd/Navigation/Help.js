import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import FlexTrail from '../Components/FlexBox';
import NavigationHeader from '../Components/NavigationHeader';

const { width } = Dimensions.get('window');

const Help = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <NavigationHeader title="Help" />
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={require('../assets/Video/pro.mp4')}
          useNativeControls
          resizeMode="cover"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          autoplaying
          defaultMute={true}
        />
      </View>
      <StatusBar />
      <ScrollView>
        <FlexTrail />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  video: {
    alignSelf: 'center',
    width: width * 0.9,
    height: width * 0.45,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: width * 0.05,
    marginHorizontal: width * 0.05,
  },
});

export default Help;