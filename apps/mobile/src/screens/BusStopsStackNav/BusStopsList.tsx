import { useEffect, useState, useContext } from "react";

import api from "../../services/api";
import { ThemeContext } from "../../Layout";
//elements
import { View, FlatList, ListRenderItem } from "react-native";
import { Button, Searchbar } from "react-native-paper";
import Header from "../../components/Header";
import { BusStop } from "../../types/databaseTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BusStopsScreenNameList } from "../BusStopsScreen";

type BusStopsListProps = NativeStackScreenProps<
  BusStopsScreenNameList,
  "BusStopsList"
>;

const BusStopsList: React.FC<BusStopsListProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
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
          navigation.navigate("ScheduleScreen", {
            busStopId: item.id,
            busStopName: item.name,
          });
        }}
      >
        {item.name}
      </Button>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Wybierz przystanek"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
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

export default BusStopsList;
