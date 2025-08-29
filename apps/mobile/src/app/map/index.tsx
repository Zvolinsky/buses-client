import { View, Text } from "react-native";
import { fetchBusStops } from "../../services/api";
import Map from "../../components/Map";
import { useQuery } from "@tanstack/react-query";

const MapPage = () => {
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
      <Map setter={false} busStops={busStops} />
    </View>
  );
};

export default MapPage;
