import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { useState, useEffect } from "react";
import { Departure } from "../../types/databaseTypes";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "../../components/Header";
import api from "../../services/api";

const BusStopSchedulePage = () => {
  const router = useRouter();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const { busStopId, busStopName } = useLocalSearchParams();
  const [departures, setDepartures] = useState<Departure[] | null>(null);

  useEffect(() => {
    fetch(
      `${api.getDepartures}?busStopId=${busStopId}&hour=${hour}&minute=${minute}&busRouteDirections=true`
    )
      .then((response) => response.json())
      .then((json) => {
        setDepartures(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={busStopName}
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
      />
      {departures && (
        <ScrollView>
          {departures.map((item) => (
            <Card key={item.id} onPress={() => {}}>
              <Card.Title
                style={{ padding: 13 }}
                title={item.bus.number}
                titleVariant="displaySmall"
                subtitle={item.busRoute.busRouteDirection.name}
                subtitleVariant="titleMedium"
                right={() => (
                  <Text style={{ fontSize: 20 }}>
                    {String(item.hour).padStart(2, "0")}:
                    {String(item.minute).padStart(2, "0")}
                  </Text>
                )}
              />
              <Card.Content>{""}</Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default BusStopSchedulePage;
