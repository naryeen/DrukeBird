import { View, Text, Image } from 'react-native';
import NavigationHeader from '../Components/NavigationHeader';

function About(){
    return(
        <View style={{marginTop:35}}>
            <NavigationHeader title={'About'}/>
            <Image source={require('../assets/Image/Logo.png')} style={{width: 200, height: 200, marginLeft: 90}}/>
            <Text style={{width: 360, marginLeft:15, marginTop: 15, fontSize:16}}>Druk EBird is managed by the Royal Society for Protection of Nature on behalf of birding, research, 
            and conservation communication to provide rich and rapidly growing database of bird sighting. {'\n'}{'\n'}
            Druk EBird documents the bird distribution, abundance, and trends through checklist data collected within a simple, scientific framework.{'\n'}{'\n'}
            In addition to providing a space for birdwatchers to share their obsevations, Druk Ebird can be also used by the researchers to study about the bird population, 
            distribution and existence.{'\n'}{'\n'}
            Overall, it is a powerful application for researchers, birdwatchers, providing a platform for users and contributing to our understanding of 
            birds and their conservation.
            </Text>
        </View>
    );
}
export default About