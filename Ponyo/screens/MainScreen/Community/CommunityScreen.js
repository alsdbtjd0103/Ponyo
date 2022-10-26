import { FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import SearchBox from "../../../components/ui/SearchBox";
import CommunityItemBox from "../../../components/ui/Community/CommunityItemBox";
import { deviceHeight, deviceWidth } from "../../../util/device-information";
import SignUpButton from "../../../components/ui/Login&SignUp/signUpButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

function CommunityScreen() {
  const [searchWord, setSearchWord] = useState();
  const navigation = useNavigation();
  const [contents,setContents] = useState();
  async function getContents(){
    const response = await axios.post("http://localhost:3000/contents");
    setContents(response.data.contents.reverse());
    console.log(response.data.contents);
  }
  useEffect(() => {
    getContents();
  },[CommunityScreen]);
  


  function pressButtonHandler() {
    navigation.navigate("WritingScreen",{id:contents[0].id});
    
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <CommunityItemBox name={item.name} story={item.content} image={item.image[0]}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.listContainer}>
        <FlatList
          data={contents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.buttonContainer}>
        <SignUpButton onPress={pressButtonHandler}>글쓰기</SignUpButton>
      </View>
    </SafeAreaView>
  );
}

export default CommunityScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  itemContainer: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.3,
  },
  listContainer: {
    marginTop:150,
  },
  buttonContainer:{
    marginTop:10,
  }
});
