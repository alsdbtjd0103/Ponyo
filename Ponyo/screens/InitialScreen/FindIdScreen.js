import { useNavigation } from '@react-navigation/native';
import {View,Text,StyleSheet} from 'react-native';
import FlatButton from '../../components/ui/FlatButton';
import SignUpButton from '../../components/ui/Login&SignUp/signUpButton';
function FindIdScreen(){
    const navigation = useNavigation();
    function backScreen(){
        navigation.goBack();
    }
    return(
        <View style={styles.rootContainer}>
            <Text style={styles.text}>아이디는 이메일 형식입니다!</Text>
            <SignUpButton onPress={backScreen}>로그인 화면으로 돌아가기</SignUpButton>
        </View>
    )
}

export default FindIdScreen;

const styles=StyleSheet.create({
    rootContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:50,
    }
})
