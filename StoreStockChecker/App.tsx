import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title='e' onPress={()=>Vibration.vibrate()}/> */}
      <View style={{ flex :1, backgroundColor:"orange"}}></View>
      <View style={{ flex :0.5, backgroundColor:"blue"}}></View>
      <View style={{ flex :1, backgroundColor:"sky"}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
