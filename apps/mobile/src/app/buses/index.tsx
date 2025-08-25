import {
  View,
  Text,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Bus } from "../../types/databaseTypes";
import api from "../../services/api";
import { useRouter } from "expo-router";
import Header from "../../components/Header";

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
    <View className="w-1/4 ">
      <TouchableOpacity
        key={item.id}
        className="h-11 w-5/6  bg-primary items-center justify-center self-center rounded-md"
        onPress={() =>
          router.push({
            pathname: "/buses/bus-route-stops",
            params: { busId: item.id, busName: item.number },
          })
        }
      >
        <Text className="text-lg font-semibold text-white dark:text-black">
          {item.number}
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View className="flex-1 bg-background">
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
      <FlatList
        className="p-3"
        ItemSeparatorComponent={() => <View className="h-5">{""}</View>}
        data={buses}
        renderItem={renderItem}
        horizontal={false}
        numColumns={4}
      />
    </View>
  );
};

export default BusesPage;
