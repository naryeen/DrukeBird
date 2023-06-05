import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import { Video } from 'expo-av';
import FlexTrail from '../Components/FlexBox';
import NavigationHeader from '../Components/NavigationHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// const { width } = Dimensions.get('window');

const Help = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <SafeAreaView>
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
      </SafeAreaView>
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
  },
  video: {
    alignSelf: 'center',
    width: wp('90%'),
    height: wp('45%'),
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
    marginVertical: wp('5%'),
    marginHorizontal: wp('5%'),
  },
});


export default Help;