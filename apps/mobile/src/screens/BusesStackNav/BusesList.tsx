import { View, FlatList, ListRenderItem } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { ThemeContext } from "../../Layout";
import api from "../../services/api";
import Header from "../../components/Header";
import { BusesScreenNameList } from "../BusesScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Bus } from "../../types/databaseTypes";

type BusesListProps = NativeStackScreenProps<BusesScreenNameList, "BusesList">;

const BusesList: React.FC<BusesListProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [buses, setBuses] = useState<Bus[] | null>(null);
  useEffect(() => {
    console.log(api.getAllBusStops);
    fetch(api.getAllBuses)
      .then((response) => response.json())
      .then((json) => {
        setBuses(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const renderItem: ListRenderItem<Bus> = ({ item }) => (
    <Button
      key={item.id}
      mode="contained-tonal"
      style={{ height: 40 }}
      onPress={() =>
        navigation.navigate("BusRouteStopsScreen", {
          busId: item.id,
          busName: item.number,
        })
      }
    >
      {item.number}
    </Button>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Wybierz linię"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
      />
      <FlatList
        style={{
          padding: 20,
          backgroundColor: theme.colors.background,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={buses}
        ItemSeparatorComponent={() => <View style={{ height: 30 }}></View>}
        renderItem={renderItem}
        horizontal={false}
        numColumns={4}
      />
    </View>
  );
};

export default BusesList;
