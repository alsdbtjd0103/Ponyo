import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Platform,
  ActionSheetIOS,
  Button,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PickImage from "../../../components/Camera/PickImage";
import SignUpButton from "../../../components/ui/Login&SignUp/signUpButton";
import { deviceWidth } from "../../../util/device-information";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getToday from "../../../util/getToday";
import {
  containsKey,
  getData,
  removeData,
  storeData,
} from "../../../util/storage";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import { UserInfoContext } from "../../../store/user-info";
import { save_db } from "../../../util/save_db";
function AddDietScreen() {
  const [image, setImage] = useState();
  const [time, setTime] = useState({
    a:'',
    b:''
  }); //시간
  const [blood, setBlood] = useState(''); //혈당
  const [carbo, setCarbo] = useState(''); //탄수화물
  const [protein, setProtein] = useState(''); // 단백질
  const [fat, setFat] = useState(''); //지방
  const [sugar,setSugar] = useState(''); // 총 당류
  const [nat,setNat] = useState(''); // 식이섬유
  const [cal, setCal] = useState('');
  const [col,setCol] = useState('') //콜레스테롤
  const [id, setId] = useState();
  const [serverImage, setServerImage] = useState();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const routes = useRoute();
  const userCtx = useContext(UserInfoContext);
  const [temps,setTemps]=useState();
  const [originalValue,setOriginalValue] = useState({
    carbo:0,
    protein:0,
    fat:0,
    cal:0,
    sugar:0,
    nat:0,
    col:0
  });
  const checkboxMorning=[
    {
      id: 0,
      text: "아침",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
      },
      size: 10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
    {
      id: 1,
      text: "점심",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
      },
      size:10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
    {
      id: 2,
      text: "저녁",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
        
      },
      size:10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
  ];
  const checkboxMeal=[
    {
      id: 0,
      text: "공복",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
      },
      size: 10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
    {
      id: 1,
      text: "식전",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
      },
      size:10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
    {
      id: 2,
      text: "식후",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
        
      },
      size:10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
  ];  
  const checkboxPer=[
    {
      id: 0.25,
      text: "25%",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
      },
      size: 10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
    {
      id: 0.5,
      text: "50%",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
      },
      size:10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
    {
      id: 0.75,
      text: "75%",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
        
      },
      size:10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
    {
      id: 1,
      text: "100%",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color:'#171717',
        paddingBottom:10,
        paddingRight:15,
        
      },
      size:10,
      style:{
        flexDirection:'column-reverse',
        justifyContent:'center',
        alignItems:'center',
        height:50,
      }
    },
  ];





  useEffect(() => {
    setId(`${getToday()}_${time.a}_${time.b}`)
    const t=() => {console.log(id)};
    t();
  }, [image, time]);

  useEffect(() => {
    const tempF = async () => {
      await imageHandler();
    }
    tempF();
  },[image])


  async function imageHandler() {
    if (!image) {
      return;
    }

    const formData = new FormData();
    const name = id;
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: image,
    });
    // formData.append( "img", {
    //   name,
    //   type: "image/jpeg",
    //   uri: image,
    // });
    
    try {
      const response = await axios.post(
        "http://627e-104-199-124-234.ngrok.io/predict",
        formData,
        {
          "file": {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log('done');
      console.log(response.data);
      setTemps(response.data.image);
      
      
      setOriginalValue({
        carbo:response.data.cal,
        protein:response.data.protein,
        fat:response.data.fat,
        cal:response.data.kcal,
        sugar:response.data.sugar,
        nat:response.data.nat,
        col:response.data.col
        //여기도 추가
      })
      setCarbo(response.data.cal);
      setProtein(response.data.protein);
      setFat(response.data.fat);
      setCal(response.data.kcal);
      setSugar(response.data.sugar);
      setNat(response.data.nat);
      setCol(response.data.col);
      //콜레스테롤, 총 당류, 등등 추가해야됨 + sql에도 추가해야됨
      setServerImage(response.data.image);
      setOpen(false);
    } catch (e) {
      console.log(e);
      setOpen(false);
    }
  }

  function modalOpen() {
    /*
    사진 분석하기 및 탄단지 채워넣기
    */
    try {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["카메라로 촬영하기", "사진 선택하기", "취소"],
          cancelButtonIndex: 2,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) {
            console.log("camera open");
          } else if (buttonIndex === 1) {
            const result = await PickImage();
            if (result) {
              const setImageF= async () => {
                setImage(result)
              }
              await setImageF();
              await imageHandler();
              console.log('detected successful')
              console.log(carbo,protein,fat,cal);
            }
          }
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
  function press() {
    console.log("press");
  }
  
  async function submitHandler() {
    if (time && blood && carbo && protein && fat) {
      /*
      정보저장 및 데이터베이스 추가
      
      */
      const data = {
        eatTime: time.a,
        time: time.b,
        blood: blood,
        carbo: carbo,
        protein: protein,
        fat: fat,
        cal: cal + "",
        imagePath: serverImage,
      };
      save_db(`insert into calory values('${userCtx.id}','${getToday()}','${time.a}','${time.b}',${carbo},${protein},${fat},${cal},'${blood}',current_timestamp,'${sugar}','${nat}','${col}');`);
      userCtx.setTempF((previous) => (previous+1));
      navigation.goBack();
    } else {
      Alert.alert("모두 입력해주세요!");
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView>
      <View style={styles.itemContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={modalOpen}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}> 사진 등록</Text>
            {image ? (
              <Text style={styles.tempText}> {"사진 등록 완료 >"}</Text>
            ) : null}
          </View>
        </Pressable>
      </View>
      <View style={styles.itemContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={press}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}> 음식 추가</Text>
            <Text style={styles.tempText}> {"음식 추가 완료 >"}</Text>
          </View>
        </Pressable>
      </View>
      <View style={[styles.formContainer]}>
        <View style={[styles.input,{height:120,alignItems:'flex-start'}]}>
          <Text style={[styles.label,{paddingTop:10}]}>시간 등록</Text>
          <View style={{}}>
          <View style={styles.checkboxContainer}>
          <BouncyCheckboxGroup
            data={checkboxMorning}
            style={{
              flexDirection: "row",
            }}
            onChange={(item) => setTime({a:item.text,b:time.b})}
          />
          </View>
          <View style={styles.checkboxContainer}>
          <BouncyCheckboxGroup
            data={checkboxMeal}
            style={{
              flexDirection: "row",
            }}
            onChange={(item) => setTime({a:time.a,b:item.text})}
          />
          </View>
          </View>
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>섭취량</Text>
          <View style={styles.checkboxContainer}>
          <BouncyCheckboxGroup
            data={checkboxPer}
            style={{
              flexDirection: "row",
            }}
            onChange={(item) => {
              //여기서 setCarbo등을 서버에서 받아온 값 * item.id로 만들어야함
              setCarbo( parseInt(carbo===0 ? originalValue.carbo*item.id : carbo*item.id));
              setProtein(parseInt(protein===0 ? originalValue.protein*item.id : protein*item.id));
              setFat(parseInt(fat===0 ? originalValue.fat*item.id : fat));
              setCal(parseInt(cal===0 ? originalValue.cal*item.id : cal));
              setSugar(parseInt(sugar===0 ? originalValue.sugar*item.id : sugar));
              setNat(parseInt(nat===0 ? originalValue.nat*item.id : nat));
              setCol(parseInt(col===0 ? originalValue.col*item.id : col));
            }}
          />
          </View>
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>혈당 측정값</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setBlood}
            value={blood + ""}
            keyboardType="numeric"
            placeholder="mg/dl"
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>탄수화물</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setCarbo}
            placeholder="g"
            value={carbo + ""}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>단백질</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setProtein}
            placeholder="g"
            value={protein + ""}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>지방</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setFat}
            placeholder="g"
            value={fat + ""}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>총 당류</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setSugar}
            placeholder="g"
            value={sugar + ""}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>콜레스테롤</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setCol}
            placeholder="g"
            value={col + ""}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>식이섬유</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setNat}
            placeholder="g"
            value={nat + ""}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>하루 섭취량</Text>
          <Text style={{ color: "#FF6838",paddingRight:30, }}>{cal} kcal</Text>
        </View>
        {temps ? (
            <View style={{ width: 300, height: 300 }}>
              <Image source={temps} />
            </View>
          ) : null}
        <View style={styles.submitButton}>
          <SignUpButton onPress={submitHandler}>추가하기</SignUpButton>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddDietScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",

  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft:10,
  },
  textInput: {
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: "#dedede",
    borderRadius: 5,
    justifyContent: "center",
    marginRight:35,
  },
  input: {
    width: deviceWidth * 0.9,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
  },
  itemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 342,
    height: 50,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  tempText: {
    color: "grey",
    fontSize: 15,
  },
  submitButton: {
    flex:1,
    marginVertical: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    textAlign: "center",
    fontSize: 15,
  },
  checkboxContainer:{
    width:250,
    height:50,
  }
});
