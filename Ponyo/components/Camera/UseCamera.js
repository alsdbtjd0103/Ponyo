import * as ImagePicker from "expo-image-picker";
import { Button,StyleSheet } from "react-native";
import {useState} from 'react';

function UseCamera(){

    const [image,setImage] = useState(null);
    async function openCamera(){
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if(permissionResult.granted===false){
            alert('Refused to access your Camera!');
            return;
        }

        const result= await ImagePicker.launchCameraAsync();
        console.log(result);
        if(!result.cancelled){
            setImage(result.uri);
            console.log(result.uri);
        }
    }

    return(
        <Button title="open Camera" onPress={openCamera} />
    );

}

export default UseCamera;