import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { ListRenderItem } from "react-native";
import { BusStop } from "../../types/databaseTypes";
import { fetchBusStops } from "../../services/api";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";

const BusStopsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [filteredBusStops, setFilteredBusStops] = useState<BusStop[] | null>(
    null
  );

  const { data: busStops, isLoading } = useQuery({
    queryFn: () => fetchBusStops(),
    queryKey: ["busStops"],
  });

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBusStops(null);
      return;
    }
    const query = searchQuery?.toLowerCase().trim() || "";
    const startsWith = busStops.filter((item) =>
      item.name.toLowerCase().startsWith(query)
    );
    const includes = busStops.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredBusStops([...new Set([...startsWith, ...includes])]);
  }, [searchQuery]);

  const renderItem: ListRenderItem<BusStop> = ({ item }: { item: BusStop }) => {
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

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg font-semibold text-primary">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background gap-3">
      <Header
        title="Wybierz linię"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
        rightHeader={{
          icon: "cog",
          onPress: () => router.push("settings"),
        }}
      />
      <Searchbar
        placeholder="Wyszukaj przystanek..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
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
