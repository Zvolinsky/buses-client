import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  FlatList,
  ListRenderItem,
} from "react-native";
import { cssInterop } from "nativewind";
import React, { createContext, useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BusRouteStop } from "../types/databaseTypes";
import api from "../services/api";

cssInterop(MaterialCommunityIcons, {
  className: {
    target: "style",
    nativeStyleToProp: { height: true, width: true, size: true },
  },
});

const Accordion = ({ data }) => {
  const router = useRouter();
  const { busId, busName } = useLocalSearchParams();
  const { busRouteDirectionId, direction } = data;
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [busRouteStops, setBusRouteStops] = useState<BusRouteStop[] | null>(
    null
  );

  useEffect(() => {
    fetch(`${api.getBusRouteStops}${busRouteDirectionId}`)
      .then((response) => response.json())
      .then((json) => {
        setBusRouteStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePress = (): void => {
    setIsOpened((s) => !s);
  };

  const renderItem: ListRenderItem<BusRouteStop> = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      className="p-5"
      onPress={() =>
        router.push({
          pathname: "/buses/schedule",
          params: {
            busId: busId,
            busStopId: item.busStopId,
            busName: busName,
            busRouteDirectionId: busRouteDirectionId,
            busStopName: item.busStop.name,
            direction: direction,
          },
        })
      }
    >
      <Text className="text-text-primary">
        {index + 1}. {item.busStop.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        id="trigger"
        className="bg-primary justify-center p-5"
        onPress={handlePress}
      >
        <Text className="text-white dark:text-black">{direction}</Text>
      </TouchableOpacity>
      <Animated.View className={isOpened ? "h-auto" : "h-0"}>
        <View>
          <FlatList
            data={busRouteStops}
            scrollEnabled={false}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View className="h-0.5 bg-slate-500"></View>
            )}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
