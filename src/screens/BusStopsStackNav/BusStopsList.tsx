import { useEffect, useState, useContext } from "react";

import api from "../../services/api";
import { ThemeContext } from "../../Layout";
//elements
import { View, Text, FlatList } from "react-native";
import { Button, Searchbar } from "react-native-paper";
import Header from "../../components/Header";

const BusStopsList = ({ navigation }) => {
  const { theme, setIsDarkMode } = useContext(ThemeContext);
  const [busStops, setBusStops] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filteredBusStops, setFilteredBusStops] = useState([]);

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
    if (searchQuery) {
      const startsWith = busStops.filter((item) =>
        item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      const includes = busStops.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBusStops([...new Set([...startsWith, ...includes])]);
    } else {
      setFilteredBusStops([]);
    }
  }, [searchQuery]);
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
        data={searchQuery ? filteredBusStops : busStops}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default BusStopsList;
