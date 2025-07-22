import { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import { ThemeContext } from "../../Layout";
//elements
import { ScrollView, View } from "react-native";
import { Card, Text, Avatar, IconButton, useTheme } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BusStopsScreenNameList } from "../BusStopsScreen";
import { Departure } from "../../types/databaseTypes";

type ScheduleScreenProps = NativeStackScreenProps<
  BusStopsScreenNameList,
  "ScheduleScreen"
>;

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  route,
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const { busStopId, busStopName } = route.params;
  const [departures, setDepartures] = useState<Departure[] | null>(null);
  function getDepartures(busStopId) {
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
  }

  useEffect(() => {
    getDepartures(busStopId);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title={busStopName}
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
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

export default ScheduleScreen;
