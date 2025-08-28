import { View, Text } from "react-native";
import { fetchBusStops } from "../../services/api";
import Header from "../../components/Header";
import { BusStop } from "../../types/databaseTypes";
import { useRouter } from "expo-router";
import Map from "../../components/Map";
import { useQuery } from "@tanstack/react-query";

const MapPage = () => {
  const router = useRouter();

  const { data: busStops, isLoading } = useQuery({
    queryFn: () => fetchBusStops(),
    queryKey: ["busStops"],
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg font-semibold text-primary">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Wyszukaj połączenie"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
        rightHeader={{
          icon: "cog",
          onPress: () => router.push("settings"),
        }}
      />
      <Map setter={false} busStops={busStops} />
    </View>
  );
};

export default MapPage;
