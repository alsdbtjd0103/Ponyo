import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function Comment({}){
    
}

function ShowContent() {
  const [name, setName] = useState("default");

  const [content, setContent] = useState("asdasdsasdsasd");

  const [comments,setComments] = useState([
    {name:"탄산슈", comment:"저혈당 무서워요 조심해요"},
    {name:"치킨쿠쿠", comment:"치킨먹고싶다..양반후바뉴"}
]);
useEffect(()=>{

},[])

  return (
    <View style={styles.rootContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{name} 님</Text>
          <Text style={styles.subtext}>자세히보기</Text>
        </View>
        <View>
            <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.bottomContainer}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>댓글  </Text>
            <Text style={{fontSize:14,color:'#C7C7CC'}}>{comments.length}개</Text>
        </View>
        <ScrollView>
                {comments.map((comment) => (
                    <Text key={comment.name}>{comment.name} and {comment.comment}</Text>
                ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default ShowContent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: 342,
    height: 693,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 22,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtext: {
    color: "grey",
    fontSize: 12,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content:{
    fontSize:14
  },
  bottomContainer:{
    flexDirection:'row',
    marginTop:500,
    alignItems:'center'
  }
});
