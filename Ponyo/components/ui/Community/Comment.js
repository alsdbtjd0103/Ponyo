import {View,Text,StyleSheet,Pressable} from 'react-native';

function Comment({onPress,children}){
    return(
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <Text>{children}</Text>
            </View>
        </Pressable>
    );
}
export default Comment;

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        textAlign:'center',
        fontSize:10,
    }
})