import { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileBox from "../../../components/ui/ProfileBox";
import { UserInfoContext } from "../../../store/user-info";
import { deviceHeight } from "../../../util/device-information";

function MypageScreen() {
    const userCtx=useContext(UserInfoContext);
    function changeName(){
        console.log('changeName');
    }
    return <SafeAreaView style={styles.rootContainer}>
        <ProfileBox />
        <View>
            <Pressable onPress={changeName}>
                <View>
                    <Text style={styles.name}>{userCtx.name ? userCtx.name : '이름'}</Text>
                </View>
            </Pressable>
        </View>
    </SafeAreaView>
}

export default MypageScreen;

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },
    name:{
        fontSize:20,
    }
});
