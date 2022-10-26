import Modal from 'react-native-simple-modal';
import {View,Text,StyleSheet, Button} from 'react-native';
function LoadingSpinner({open,setOpen}){
    return(
        <Modal
          open={open}
          modalDidOpen={() => console.log("modal open", open)}
          modalDidClose={() => setOpen(false)}
        >
          <View>
            <Text>모달창</Text>
            <Button title="close" onPress={() => setOpen(false)} />
          </View>
        </Modal>
    )
}

export default LoadingSpinner;

const styles=StyleSheet.create({
    modalContainer:{

    }
})
