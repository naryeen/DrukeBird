import { Platform } from "react-native";

let baseURL = ''

{Platform.OS=='android'
?baseURL = 'http://10.9.211.203:4001'
:baseURL = 'http://10.9.211.203:4001'
}

export default baseURL