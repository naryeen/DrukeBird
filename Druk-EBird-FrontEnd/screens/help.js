import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import FlexTrail from './components/flexbox';

const help = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video

                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                    autoplaying
                    defaultMute={true}
                />
            </View>
            <StatusBar />
            <FlexTrail/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        
    },
    video: {
     
        alignSelf: 'center',
        width: 400,
        height: 200,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  videoContainer: {
      shadowOffset: { 
          width: 0, 
         
           
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      
  },
});

export default help;
