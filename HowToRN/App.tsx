import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
// import React from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Vibration,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

const SCREEN_WIDTH = Dimensions.get("window").width;
// 이건 무료 api라 괜찮지만 원래 키 어플 안에 넣으면 안됨!
const API_KEY = "f407cb310fddb637216a3b94b9ca4a74";
const NOW_DATE = new Date();
const icons: Record<string, string> = {
  온흐림: "cloudy",
  맑음: "day-sunny",
};
export default function App() {
  const [city, setCity] = useState("...로딩중!");
  const [days, setDays] = useState<any[]>([]);

  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setOk(false);
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: 5,
      });
      const location = await Location.reverseGeocodeAsync(
        {
          latitude,
          longitude,
        },
        { useGoogleMaps: false }
      );
      const { district, region } = location[0];
      if (district && region) {
        setCity(`${region} ${district}`);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr&units=metric`
        );
        const json = await response.json();
        setDays(
          json.list.filter((weather: any) => {
            if (weather.dt_txt.includes("00:00:00")) {
              return weather;
            }
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        <Text>{NOW_DATE.toLocaleString()}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        persistentScrollbar={true}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          days.map((day: any, index: number) => (
            <View key={index} style={styles.day}>
              <Text style={styles.date}>[ {day.dt_txt.slice(5, 10)} ]</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.temp}>{day.main.temp.toFixed(1)} 도</Text>
                {/* <Text>{parseFloat(day.main.temp).toFixed(1)} 도</Text> */}
                <Fontisto
                  name={
                    icons[day.weather[0].description] ??
                    ("cloudy" as keyof typeof icons)
                  }
                  size={20}
                  color="black"
                />
              </View>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 3,
                  borderColor: "white",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
              <Text style={styles.tinyWeather}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
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
  },
  temp: {
    fontSize: 80,
    fontWeight: "bold",
  },
  desc: { fontSize: 60 },
  tinyWeather: { fontSize: 16 },
  date: { fontSize: 20, fontWeight: "bold" },
});
