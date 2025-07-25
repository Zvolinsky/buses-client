import { useState, useEffect, useContext } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { ThemeContext } from "../Layout";

import api from "../services/api";
import { BusRouteDirection, BusRouteStop } from "../types/databaseTypes";
import { useLocalSearchParams, useRouter } from "expo-router";

type TabNavigatorProps = {
  data: BusRouteDirection[];
};

type TableProps = {
  data: {
    busRouteDirectionId: number;
    busId: number;
    busName: string;
    direction: string;
  };
};

export const Table: React.FC<TableProps> = ({ data }) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { busRouteDirectionId, busId, busName, direction } = data;
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

  return (
    <FlatList
      nestedScrollEnabled
      data={busRouteStops}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: theme.colors.background }}>
          <Button
            key={item.id}
            labelStyle={{
              fontSize: 20,
              paddingHorizontal: 20,
              width: "100%",
              height: 40,
              textAlign: "left",
              verticalAlign: "middle",
            }}
            onPress={() =>
              router.push({
                pathname: "/buses/schedule",
                params: {
                  busId: busId,
                  busStopId: item.busStopId,
                  busName: busName,
                  busRouteDirectionId: busRouteDirectionId,
                  direction: direction,
                },
              })
            }
          >
            <Text>{item.busStop.name}</Text>
          </Button>
          <Divider leftInset bold theme={theme} />
        </View>
      )}
    />
  );
};

const TabNavigator: React.FC<TabNavigatorProps> = ({ data }) => {
  const { busId, busName } = useLocalSearchParams();
  return (
    <ScrollView>
      <View>
        <Text>{`Do: ${data[0].name}`}</Text>
      </View>

      <Table
        data={{
          busRouteDirectionId: data[0].id,
          busId: busId,
          busName: busName,
          direction: data[0].name,
        }}
      />
      <View>
        <Text>{`Do: ${data[1].name}`}</Text>
      </View>

      <Table
        data={{
          busRouteDirectionId: data[1].id,
          busId: busId,
          busName: busName,
          direction: data[1].name,
        }}
      />
    </ScrollView>
  );
};

export default TabNavigator;
