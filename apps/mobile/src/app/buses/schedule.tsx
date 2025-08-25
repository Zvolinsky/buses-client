import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../services/api";
import { groupByDayOfWeek, groupByHours } from "../../utils/reduce";
import TabNavigator from "../../components/TabNavigator";

export type GroupedDeparture = {
  id: number;
  hour: string;
  departure: {
    minute: number;
    busRouteId: number;
    routeInfo?: number[];
  }[];
};

const SchedulePage = () => {
  const {
    busId,
    busStopId,
    busName,
    busRouteDirectionId,
    busStopName,
    direction,
  } = useLocalSearchParams();
  const router = useRouter();
  const [departures, setDepartures] = useState<GroupedDeparture[] | null>(null);
  useEffect(() => {
    fetch(
      `${api.getDepartures}?busId=${busId}&busStopId=${busStopId}&busRouteDirectionId=${busRouteDirectionId}&busRoutes=true`
    )
      .then((res) => res.json())
      .then((json) => {
        const groupedByHours = groupByHours(json);
        const result = groupByDayOfWeek(groupedByHours);
        setDepartures(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View className="bg-background flex-1" pointerEvents="auto">
      <Header
        title={`Rozkład jazdy - ${busName}`}
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
        rightHeader={{
          icon: "cog",
          onPress: () => router.push("settings"),
        }}
      />
      <View className="gap-3 p-7">
        <Text className="text-text-primary text-2xl">{busStopName}</Text>
        <Text className="text-text-primary text-xl">{direction}</Text>
      </View>
      {departures && <TabNavigator data={departures} />}
    </View>
  );
};

export default SchedulePage;
