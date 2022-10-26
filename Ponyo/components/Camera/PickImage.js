import * as ImagePicker from "expo-image-picker";


async function PickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      return result.uri;
    }
    else{
      return false;
    }
  
}

export default PickImage;

