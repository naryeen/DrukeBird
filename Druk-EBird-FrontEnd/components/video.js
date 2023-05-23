import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Video } from 'expo-av';

const vedio = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://www.youtube.com/watch?v=EK31fHwO_60',
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
        justifyContent: 'center',
        backgroundColor: '#FFF',
        padding: 10,
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: 400,
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
            height: 1 
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        padding: 15,
    },
});

export default vedio;