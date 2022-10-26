import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import SignUpButton from "../../../components/ui/Login&SignUp/signUpButton";
import Picker from "../../../components/ui/Picker";

function InputB({ placeholder, onChangeText, value }) {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderRadius: 5,
        width: 80,
        height: 35,
        borderColor: "#dadada",
      }}
      require
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
}
function Template({ label, inputBox,paddingRight }) {
  return (
    <View
      style={{
        width: 200,
        height: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'space-between',
        
      }}
    >
      <Text style={{ fontWeight: "bold" ,paddingRight:paddingRight,}}>{label}</Text>
      <View style={{}}>{inputBox}</View>
    </View>
  );
}

function PredictScreen() {
  const navigation = useNavigation();
  const checkboxSex = [
    {
      id: 0,
      text: "남성",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color: "#171717",
        paddingBottom: 10,
        paddingRight: 15,
      },
      size: 10,
      style: {
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
      },
    },
    {
      id: 1,
      text: "여성",
      textStyle: {
        textDecorationLine: "none",
        fontSize: 15,
        fontWeight: "500",
        color: "#171717",
        paddingBottom: 10,
        paddingRight: 15,
      },
      size: 10,
      style: {
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
      },
    },
  ];
  const [sex,setSex] = useState();
  const [age, setAge] = useState();
  const [waist, setWaist] = useState();
  const [bmi, setBmi] = useState();
  const [blood, setBlood] = useState();
  const [exercise, setExercise] = useState();
  const [meal, setMeal] = useState();
  const [latemeal, setLatemeal] = useState();
  const [morning, setMorning] = useState();
  const [drink, setDrink] = useState();
  return (
    <View
      style={{
        flex: 1,
        justifyContent:'space-around',
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Template
        label="성별"
        paddingRight={75}
        inputBox={
          <BouncyCheckboxGroup
            data={checkboxSex}
            style={{
              flexDirection: "row",
            }}
            onChangeValue={(value) => setSex(value)}
          />
        }
      />
      
      <Template
        label="나이"
        inputBox={
          <InputB placeholder={"세"} onChangeText={setAge} value={age} />
        }
      />
      
      <Template
        label="허리둘레"
        inputBox={
          <InputB placeholder={"cm"} onChangeText={setWaist} value={waist} />
        }
      />
      <Template
        label="BMI"
        inputBox={
          <InputB placeholder={"ex) 24.6"} onChangeText={setBmi} value={bmi} />
        }
      />
      <Template
        label="혈압"
        inputBox={
          <Picker
            text=""
            items={[
              { label: "정상", value: "정상", key: "1" },
              { label: "고혈압", value: "고혈압", key: "2" },
              { label: "저혈압", value: "저혈압", key: "3" },
            ]}
            onValueChange={setBlood}
            width={80}
            height={35}
          />
        }
      />
      <Template
        label="35분 운동"
        inputBox={
          <Picker
            text=""
            items={[
              { label: "O", value: "O", key: "1" },
              { label: "x", value: "x", key: "2" },
            ]}
            onValueChange={setExercise}
            width={80}
            height={35}
            onPress={() => console.log('asd')}
          />
        }
      />
      <Template
        label="빠른 식사"
        inputBox={
          <Picker
            text=""
            items={[
              { label: "O", value: "O", key: "1" },
              { label: "x", value: "x", key: "2" },
            ]}
            onValueChange={setMeal}
            width={80}
            height={35}
          />
        }
      />
      <Template
        label="야식"
        inputBox={
          <Picker
            text=""
            items={[
              { label: "O", value: "O", key: "1" },
              { label: "x", value: "x", key: "2" },
            ]}
            onValueChange={setLatemeal}
            width={80}
            height={35}
          />
        }
      />
      <Template
        label="아침식사"
        inputBox={
          <Picker
            text=""
            items={[
              { label: "O", value: "O", key: "1" },
              { label: "x", value: "x", key: "2" },
            ]}
            onValueChange={setMorning}
            width={80}
            height={35}
          />
        }
      />
      <Template
        label="음주"
        inputBox={
          <Picker
            text=""
            items={[
              { label: "O", value: "O", key: "1" },
              { label: "x", value: "x", key: "2" },
            ]}
            onValueChange={setDrink}
            width={80}
            height={35}
          />
        }
      />
      <SignUpButton onPress={() => {
        navigation.navigate('PredictResult');
        }}>
        예측하기
      </SignUpButton>
    </View>
  );
}

export default PredictScreen;
