import { View, Text } from "react-native";
import { fetchBusStops } from "../../services/api";
import Map from "../../components/Map";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";

const MapPage = () => {
  const { data: busStops, isLoading } = useQuery({
    queryFn: () => fetchBusStops(),
    queryKey: ["busStops"],
  });

  if (isLoading) return <Loader />;
  return (
    <View className="flex-1 bg-background">
      <Map setter={false} busStops={busStops} />
    </View>
  );
};

export default MapPage;
