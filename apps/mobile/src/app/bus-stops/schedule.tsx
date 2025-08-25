import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useState, useEffect } from "react";
import { Departure } from "../../types/databaseTypes";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "../../components/Header";
import api from "../../services/api";

const BusStopSchedulePage = () => {
  const router = useRouter();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const { busStopId, busStopName } = useLocalSearchParams();
  const [departures, setDepartures] = useState<Departure[] | null>(null);

  useEffect(() => {
    fetch(
      `${api.getDepartures}?busStopId=${busStopId}&hour=${hour}&minute=${minute}&busRouteDirections=true`
    )
      .then((response) => response.json())
      .then((json) => {
        setDepartures(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View className="flex-1 bg-background">
      <Header
        title={`${busStopName}`}
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
        rightHeader={{
          icon: "cog",
          onPress: () => router.push("settings"),
        }}
      />
      {departures &&
        (departures.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-text-primary text-lg">
              Brak odjazdów w najbliższym czasie
            </Text>
          </View>
        ) : (
          <ScrollView>
            {departures.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="border border-gray-400 rounded-lg bg-background flex-row justify-between p-5"
                onPress={() => {}}
              >
                <View className="gap-4">
                  <Text className="text-text-primary font-semibold text-3xl">
                    {item.bus.number}
                  </Text>
                  <Text className="text-text-primary text-lg">
                    {item.busRoute.busRouteDirection.name}
                  </Text>
                </View>
                <View>
                  <Text className="text-text-primary font-black text-lg">
                    {String(item.hour).padStart(2, "0")}:
                    {String(item.minute).padStart(2, "0")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ))}
    </View>
  );
};

export default BusStopSchedulePage;
