import { View, Text, ListRenderItem, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Bus } from "../../types/databaseTypes";
import api from "../../services/api";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import { mockBuses } from "../../mocks/buses";

const BusesPage = () => {
  const [buses, setBuses] = useState<Bus[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    fetch(api.getAllBuses)
      .then((res) => res.json())
      .then((json) => {
        setBuses(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderItem: ListRenderItem<Bus> = ({ item }) => (
    <Pressable
      key={item.id}
      style={{ height: 40 }}
      onPress={() =>
        router.push({
          pathname: "/buses/bus-route-stops",
          params: { busId: item.id, busName: item.number },
        })
      }
    >
      <Text>{item.number}</Text>
    </Pressable>
  );
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Wybierz linię"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
      />
      <FlatList
        style={{
          padding: 20,
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

export default BusesPage;
