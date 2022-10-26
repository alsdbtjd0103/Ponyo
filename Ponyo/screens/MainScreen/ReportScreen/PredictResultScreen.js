import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import SignUpButton from "../../../components/ui/Login&SignUp/signUpButton";
import { deviceHeight, deviceWidth } from "../../../util/device-information";
import * as Font from "expo-font";
function PredictResultScreen() {
  const [percent, setPercent] = useState(0.7);
  const [font,setFont]=useState(false);
  useEffect(() => {
    async function fontF() {
      await Font.loadAsync({
        Montserrat: require("../../../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
        "Montserrat-medium": require("../../../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-semibold": require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
      });
      setFont(true);
    }
    fontF();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: deviceHeight * 0.3,
          width: deviceWidth,
          alignItems: "center",
        }}
      >
        <ProgressCircle
          strokeWidth={10}
          style={{ height: 200, width: 200 }}
          progress={percent}
          progressColor={"#FF6838"}
         >
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily:'Montserrat-medium',fontSize:32}}>{percent*100}</Text>
                <Text style={{marginTop:10}}>%</Text>
            </View>
         </ProgressCircle>
         
      </View>
      <View
        style={{
          backgroundColor: "#FF6838",
          height: deviceHeight * 0.5,
          width: deviceWidth,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <Image
          style={{
            width: deviceWidth,
            height: 140,
            resizeMode: "cover",
            marginTop: 30,
          }}
          source={require("../../../assets/Vector.png")}
        />
        <Text style={{color:'white',marginHorizontal:20,marginTop:20,fontWeight:'bold'}}>당뇨병 예측 확률이 높아요.</Text>
        <Text style={{color:'white',marginHorizontal:20,fontWeight:'bold',marginTop:10}}>근처 병원에 가서 당뇨병 관련 검사를 받아주세요. </Text>
      </View>
    </View>
  );
}

export default PredictResultScreen;
