
import { Pressable, StyleSheet, Text, View } from "react-native";


function ItemBox({ children, onPress,width,height,notText}) {

    const styles = StyleSheet.create({
      button: {
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "white",
        shadowColor: "grey",
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:width,
        height:height
      },
      pressed: {
        opacity: 0.7,
      },
      buttonText: {
        textAlign: "center",
        fontWeight:'bold',
        fontSize: 20,
      },
    });
    

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
        {notText ? <View>{children}</View> : <Text style={styles.buttonText}>{children}</Text>}
    </Pressable>
  );
  
}

export default ItemBox;

