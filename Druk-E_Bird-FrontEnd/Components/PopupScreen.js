import { StyleSheet, View} from 'react-native';
import { TextInput } from 'react-native-paper';
import Button from "../Components/Button";

const PopupScreen = ({ birdName }) => {
    const [Adult, setAdult] = useState("");
    const [Juvenile, setJuvenile] = useState("");
    const [Remarks, setRemarks] = useState("");


    const birdType = () => {
        let bridJAData = {
        "Totalcount":{
            Adult: Adult,
          Juvenile: Juvenile,
          Remarks: Remarks,
        }
        };
        axios
          .post('https://druk-ebirds.onrender.com/api/v1/checkList', bridJAData)
          .then(res => {
            if (res.data.status == "success") {
              ToastAndroid.show('Data successfully posted',
                ToastAndroid.LONG);
    
              setTimeout(() => {
                navigation.navigate('Login');
              }, 200);
            }
          })
          .catch(err => {
            JSON.stringify(err);
            let message =
              typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message;
    
            ToastAndroid.show(message,
              ToastAndroid.SHORT);
          });
      };

    return (
        <View style={styles.popupContainer}>
            <View style={styles.container}>

                <TextInput
                    style={styles.inputStyle}
                    mode="outlined"
                    label="Adult"
                    placeholder="Enter the number of adult birds"
                    left={<TextInput.Icon icon="briefcase" />}
                    onChangeText={(text) => setAdult(text)}
                    value={Adult}
                    />
                <TextInput
                    style={styles.inputStyle}
                    mode="outlined"
                    label="Juvenile"
                    placeholder="Enter the number of Juvenile birds"
                    left={<TextInput.Icon icon="briefcase" />}
                    onChangeText={(text) => setJuvenile(text)}
                    value={Juvenile}/>
                    
                <TextInput
                    style={styles.inputStyle}
                    mode="outlined"
                    label="Remarks"
                    placeholder="Leave the remarks here"
                    left={<TextInput.Icon icon="briefcase" />}
                    onChangeText={(text) => setRemarks(text)}
                    value={Remarks}/>
                

                <Button styling={styles.buttonstyle} onPress={() => birdType()}>Submit</Button>
            </View>
           
        </View>
    );
};



const styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        position: 'absolute',
        top: '15%',
        left: '32%',
        width: '90%',
        height: '80%',
        transform: [{ translateX: -90 }, { translateY: -80 }],
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginTop: 10,
        elevation: 5,
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '90%',
        height: '50%',
    },
    buttonstyle: {
        backgroundColor: '#136D66',
        marginTop: 30,
        width: "100%",
      },
      inputStyle: {
        marginTop: 20,
        borderColor: '#ccc',
        borderRadius: 5,
        width:300
      },
});

export default PopupScreen;