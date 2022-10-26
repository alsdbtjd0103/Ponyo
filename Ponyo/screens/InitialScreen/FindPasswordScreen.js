import { useNavigation } from '@react-navigation/native';
import {View,Text,StyleSheet, Button} from 'react-native';
import FlatButton from '../../components/ui/FlatButton';
import Input from '../../components/ui/Input';
import SignUpButton from '../../components/ui/Login&SignUp/signUpButton';

function FindPasswordScreen(){
    const navigation = useNavigation();
    
    function backScreen(){
        navigation.goBack();
    }
    function sendEmail(){
        console.log('send email')
    }
    return(
        
        <View style={styles.rootContainer}>
            <Button title='Test' onPress = {() => navigation.navigate('test')}></Button>
            <Input text="이메일을 입력하세요"></Input>
            <SignUpButton onPress={sendEmail}>이메일로 임시 비밀번호 발급</SignUpButton>
            <FlatButton onPress={backScreen}>뒤로가기</FlatButton>
        </View>
    )
}


export default FindPasswordScreen;

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
