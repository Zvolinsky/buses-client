import { View, Text } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import { BusRouteDirection } from "../../types/databaseTypes";
import TabNavigator from "../../components/TabNavigator";

const BusRoutesPage = () => {
  const router = useRouter();
  const { busId, busName } = useLocalSearchParams();
  const [busRouteDirections, setBusRouteDirections] = useState<
    BusRouteDirection[] | null
  >(null);
  useEffect(() => {
    fetch(`${api.getBusRouteDirectionByBusId}${busId}`)
      .then((res) => res.json())
      .then((json) => {
        setBusRouteDirections(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View>
      <Header
        title="Wybierz przystanek"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
      />
      <View>
        <Text>Linia {busName}</Text>
        {busRouteDirections && busRouteDirections.length > 1 && (
          <View>
            <Text style={{ fontSize: 18 }}>Kierunki:</Text>
            <Text>
              {busRouteDirections[0].name} – {busRouteDirections[1].name}
            </Text>
          </View>
        )}
      </View>
      {busRouteDirections && <TabNavigator data={busRouteDirections} />}
    </View>
  );
};

export default BusRoutesPage;
