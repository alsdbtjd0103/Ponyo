import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function LoadingPage({ message }) {
  return ( //Loading Screen
    <View style={styles.rootContainer}>
      
      <ActivityIndicator size={'large'} color={'#FF6838'}/>   
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export default LoadingPage;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor:'white'
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    marginTop:20,
  },
});
