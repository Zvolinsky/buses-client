import { View, Text, FlatList } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { ListRenderItem } from "react-native";
import { BusStop } from "../../types/databaseTypes";
import api from "../../services/api";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Header from "../../components/Header";

const BusStopsPage = () => {
  const router = useRouter();
  const [busStops, setBusStops] = useState<BusStop[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [filteredBusStops, setFilteredBusStops] = useState<BusStop[] | null>(
    null
  );

  useEffect(() => {
    fetch(api.getAllBusStops)
      .then((response) => response.json())
      .then((json) => {
        setBusStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      <Button
        onPress={() => {
          router.push({
            pathname: "/bus-stops/schedule",
            params: { busStopId: item.id, busStopName: item.name },
          });
        }}
      >
        {item.name}
      </Button>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Wybierz linię"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
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
      />
    </View>
  );
};

export default BusStopsPage;
