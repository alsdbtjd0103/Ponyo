import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import { deviceWidth } from "../../../util/device-information";
import Comment from "./Comment";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

function CommunityItemBox({ name, story, image,onPress }) {
  const [inputStory, setInputStory] = useState("");
  const [like,setLike] = useState(false);
  const navigation=useNavigation();
  if(image){
    console.log(typeof(image._3))
  }
  function showContent(){
    navigation.navigate('ShowContent');
  }
  useEffect(() => {
    if (story.length > 100) {
      for (let i = 0; i < 100; i++) {
        setInputStory((previous) => previous + story[i]);
      }
      setInputStory((previous) => previous + "...");
    } else {
      setInputStory(story);
    }
  }, [story]);

  function button1(){
    setLike((previous) => !previous);

  }

  function button2(){
    console.log('댓글');
  }

  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={({ pressed }) => [styles.content, pressed && styles.pressed]}
        onPress={showContent}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{name} 님</Text>
          <Text style={styles.subtext}>자세히보기</Text>
        </View>
        <View style={styles.storyContainer}>
          <Text>{inputStory}</Text>
        </View>
        
        <View style={{flexDirection:'row',alignItems:"center",marginTop:20,marginLeft:10}}>
        {image ? <Image style={{width:50,height:50,borderRadius:10}}source={{uri:image._3}}/> : null}
      </View>
      
      </Pressable>

      <View style={[styles.buttonContainer]}>
        <Pressable onPress={button1}>
          <View style={styles.button}>
            {like ? <FontAwesome name="heart" size={24} color='black'/> : <Feather name="heart" size={24} color='black' />}
            <Text>    </Text>
            <Text style={styles.buttonText}>공감하기</Text>
          </View>
        </Pressable>
        <Pressable onPress={button2}>
          <View style={styles.button}>
          <MaterialCommunityIcons name="comment-multiple" size={24} color='black' />
          <Text>   </Text>
            <Text style={styles.buttonText}>댓글달기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default CommunityItemBox;

const styles = StyleSheet.create({
  rootContainer: {
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
    width: deviceWidth * 0.9,
    height: 200,
  },
  pressed: {
    opacity: 0.7,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  storyContainer: {
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtext: {
    color: "grey",
    fontSize: 12,
  },
  tempContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  content:{
    width:deviceWidth*0.9,
    height:150,
  },
  button:{
    width:deviceWidth*0.45,
    height:40,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText:{
    color:'#757575',
    fontSize:12,
  }
});
