import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Video } from 'expo-av';

const PromotionalVideo = () => {
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
                />
            </View>
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#FFF',
        
    },
    video: {
      paddingTop:100,
        alignSelf: 'center',
        width: 400,
        height: 100,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  videoContainer: {
      shadowColor: '#000',
      shadowOffset: { 
          width: 0, 
          height: 1,
           
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 2,
      padding: 15,
      
  },
});

export default PromotionalVideo;