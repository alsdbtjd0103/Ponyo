import { Image, View,Button, Pressable, ScrollView } from "react-native";
import Labeling from "../components/ui/Labeling";

function Test(){
  const pressHandler = (e) => {
    console.log(e.nativeEvent.pageX);
    console.log(e.nativeEvent.pageY);
  };
  
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Pressable onPress={pressHandler}>
      <Image source={require('../assets/face.jpeg')} style={{}} />
      </Pressable>
      <Labeling />

    </View>
  )
}

export default Test;