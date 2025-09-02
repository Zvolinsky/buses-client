import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ListRenderItem } from "react-native";
import { BusStop } from "../../types/databaseTypes";
import { fetchBusStops } from "../../services/api";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Filter from "../../components/Filter";
import Loader from "../../components/Loader";

const renderItem: ListRenderItem<BusStop> = ({ item }: { item: BusStop }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="p-4 bg-background"
      onPress={() => {
        router.push({
          pathname: "/bus-stops/schedule",
          params: { busStopId: item.id, busStopName: item.name },
        });
      }}
    >
      <Text className="text-text-primary">{item.name}</Text>
    </TouchableOpacity>
  );
};

const BusStopsPage = () => {
  const { data: busStops, isLoading } = useQuery({
    queryFn: () => fetchBusStops(),
    queryKey: ["busStops"],
  });
  const [filteredBusStops, setFilteredBusStops] = useState<BusStop[] | null>(
    null
  );

  if (isLoading) return <Loader />;
  return (
    <View className="flex-1 bg-background gap-3 p-3">
      <Filter filterFunction={setFilteredBusStops} data={busStops} />
      <FlatList
        data={filteredBusStops ? filteredBusStops : busStops}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View className="h-0.5 bg-gray-400">{""}</View>
        )}
      />
    </View>
  );
};

export default BusStopsPage;
