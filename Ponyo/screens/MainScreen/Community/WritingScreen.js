import { StyleSheet, View, Text, TextInput,Pressable, ActionSheetIOS } from "react-native";
import { useContext, useEffect, useState } from "react";
import { deviceWidth } from "../../../util/device-information";
import { Feather,AntDesign } from "@expo/vector-icons";
import SignUpButton from "../../../components/ui/Login&SignUp/signUpButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserInfoContext } from "../../../store/user-info";
import axios from "axios";
import getToday from "../../../util/getToday";
import PickImage from "../../../components/Camera/PickImage";

function WritingScreen() {
  const [story, setStory] = useState("");
  const route = useRoute();
  const id = parseInt(route.params.id)+1;
  const navigation=useNavigation();
  const userCtx = useContext(UserInfoContext);
  const today = getToday();
  const [images,setImages] = useState([]);
  const [image,setImage] = useState();
  async function addImage(){
    console.log('addImage');
    modalOpen();
    
  };
  useEffect(() => {
    if(image){
      setImages([...images,image]);
    }
    
    
  },[image]);
  function deleteImage(){
    console.log('delete');
    
  }
  
  function modalOpen() {
    
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["카메라로 촬영하기", "사진 선택하기", "취소"],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          console.log('camera open');
        } else if (buttonIndex === 1) {
          setImage(PickImage());
        }
      }
    );
  }
  async function submitHandler(){
    const content={
      "id":id+"",
      "name": userCtx.name,
      "title":"",
      "content":story,
      "image":images,
      "date":today
  };
    await axios.post('http://localhost:3000/contents/add',content);
    navigation.replace('CommunityScreen');
    
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>글쓰기</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          maxLength={200}
          style={styles.inputStory}
          placeholder="오늘부터 글쓰면서 당뇨 정보를 공유해요."
          value={story}
          onChangeText={setStory}
          multiline={true}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>오늘의 식단 추가하기</Text>
        <Text style={styles.subtitle}>음식이 전부 보이게 촬영해주세요</Text>
        <View style={styles.imageContainer}>
          <Pressable onPress={addImage}>
            <Feather name="plus-square" size={40} color="black" />
          </Pressable>
        {image ? images.map((image,index) => {
  
          return(
          <Pressable key={index} onPress={deleteImage}>
            <AntDesign name="picture" size={40} color='black' />
          </Pressable>
          )
        }) : null}
        </View>
      </View>
      <SignUpButton onPress={submitHandler}>완료</SignUpButton>
    </View>
  );
}
export default WritingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",

  },
  titleContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputStory: {
    width: deviceWidth * 0.9,
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DBDBDB",
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginVertical: 20,
  },
  imageContainer: {
    flexDirection: "row",
    marginBottom:250,
  },
});
