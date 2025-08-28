import { View, Text } from "react-native";
import Header from "../../components/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchDepartures } from "../../services/api";
import TabNavigator from "../../components/TabNavigator";
import { useQuery } from "@tanstack/react-query";
import { groupByDayOfWeek, groupByHours } from "../../utils/reduce";

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
  const busRoutes = true;
  const {
    busId,
    busStopId,
    busName,
    busRouteDirectionId,
    busStopName,
    direction,
  } = useLocalSearchParams();
  const router = useRouter();

  const { data: departures, isLoading } = useQuery({
    queryFn: async () => {
      const data = await fetchDepartures(
        busId as unknown as number,
        busStopId as unknown as number,
        busRouteDirectionId as unknown as number,
        busRoutes as unknown as boolean
      );
      const groupedByHours = groupByHours(data);
      const result = groupByDayOfWeek(groupedByHours);
      return result;
    },
    queryKey: ["departures", busStopId],
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg font-semibold text-primary">Ładowanie...</Text>
      </View>
    );
  }

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
