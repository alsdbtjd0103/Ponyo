import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Text, View ,StyleSheet} from "react-native";
import ProfileBox from "./ProfileBox";


function Labeling({label,cal,gram,width,height,src}){
    const [font,setFont] = useState(false);
    useEffect(() => {
        async function fontF() {
          await Font.loadAsync({
            Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
            "Montserrat-bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
            "Montserrat-medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
            "Montserrat-semibold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
          });
          setFont(true);
        }
        fontF();
      }, []);

    return(
        <View style={[styles.basicContainer]}>
            <View style={{borderRadius:50,width:90,height:90,backgroundColor:'#FF6838',justifyContent:'center',alignItems:'center'}}>
            <ProfileBox width={80} height={80} src={src}/>
            </View>
            <View style={{paddingLeft:8}}>
            <Text style={{fontFamily:'Montserrat-bold'}}>{label}</Text>
            <Text style={{fontFamily:'Montserrat-medium',color:'#4B4B4B',paddingTop:10}}>{cal} cal / {gram}g</Text>
            </View>
        </View>
    )
}

export default Labeling;

const styles=StyleSheet.create({
    basicContainer:{
        width:200,
        height:80,
        backgroundColor:'white',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
})
