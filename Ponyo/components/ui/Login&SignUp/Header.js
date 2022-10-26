import { Text, View, StyleSheet } from "react-native";

function Header({ children, step }) {
  return (
    <View style={styles.headerContainer}>
      {step ? <Text style={styles.step}>step {step}</Text> : null}
      <Text style={styles.headerText}>{children}</Text>
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  headerContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  step:{
    fontSize:20,
    color:'#c1c1c1',
    marginBottom:10,
  }
});
