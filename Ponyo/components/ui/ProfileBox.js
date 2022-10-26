import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight,TextInput } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { deviceHeight, deviceWidth } from "../../util/device-information";

function ProfileBox({width,height,src}) {
  const [image, setImage] = useState(
    require("../../assets/face.jpeg")
  );
  useEffect(() => {
    if (src){
      setImage(src);
    }
  });

  const [state,setState] = useState();

  async function pressImageHandler(){
    console.log('pppp');
  }
  return (
    <View style={styles.rootContainer}>

      <View style={[styles.profileContainer,{width:width,height:height,borderWidth:1,borderColor:'#999999'}]}>
        <TouchableHighlight onPress={pressImageHandler}>
          <Image source={image} style={styles.image} />
        </TouchableHighlight>
      </View>

    </View>
  );
}

export default ProfileBox;

const styles = StyleSheet.create({
  rootContainer: {
    
  },
  profileContainer: {
    backgroundColor: "grey",
    borderRadius: 150,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
