import {View,Text,StyleSheet} from 'react-native';
import SignUpButton from '../../components/ui/Login&SignUp/signUpButton';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Success(){
    const navigation=useNavigation();
    function submitHandler(){
        navigation.navigate('Login');
    }
    return(
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.tempContainer}>
            <Feather name='check' size={50} color='#62C102' />
            <View style={styles.textContainer}>
                <Text style={styles.text}>   회원 가입이{'\n'}완료되었습니다</Text>
            </View>
            </View>
            <SignUpButton onPress={submitHandler}>다음</SignUpButton>
        </SafeAreaView>
    )
}
export default Success;

const styles= StyleSheet.create({
    rootContainer:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
    },
    tempContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:250,
    },
    textContainer:{
        marginVertical:30,
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
    }
})