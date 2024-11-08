import { StatusBar } from "expo-status-bar";
// import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Vibration,
  Dimensions,
  ScrollView,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

console.log(SCREEN_WIDTH);
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title='e' onPress={()=>Vibration.vibrate()}/> */}
      {/* <View style={{ flex: 1, backgroundColor: "orange" }}></View>
      <View style={{ flex: 0.5, backgroundColor: "blue" }}></View>
      <View style={{ flex: 1, backgroundColor: "sky" }}></View> */}
      {/* <Text style={{ fontSize: 15 }}>
        🧾 물건의 구매 페이지 주소를 입력해주세요! 🧾
      </Text>
      <Button
        title="품절인지 확인하기"
        color="orange"
        onPress={() => Vibration.vibrate()}
      /> */}
      <StatusBar backgroundColor="white" />
      <View style={styles.city}>
        <Text style={styles.cityName}>광주</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        // showsHorizontalScrollIndicator={false} -> 스크롤바 숨기기
        // indicatorStyle="white" -> ios에만 작동해!
        persistentScrollbar={
          true
        } /* 스크롤바 안 써도 안 사라지게 할 수 있음! */
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.desc}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.desc}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.desc}>맑음</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#F5DCB7",
  },
  city: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: { fontSize: 55, fontWeight: "500" },
  weather: {
    // flex: 1,
    // backgroundColor: "gray",
  },
  day: {
    // flex: 1,
    // justifyContent: "center",
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "orange",
  },
  temp: { fontSize: 140, marginTop: 40 },
  desc: { fontSize: 60, marginTop: -40 },
});
