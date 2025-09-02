import { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { DataTable, Divider } from "react-native-paper";
import routeInfo, { infoDescription } from "../enums/routeInfo";
import { BusRouteStop } from "../types/databaseTypes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TabView } from "react-native-tab-view";
import { GroupedDeparture } from "../app/buses/schedule";

type TabNavigatorProps = {
  data: GroupedDeparture[];
};

const renderDepartureButtons = (item) => {
  const { busId, busStopId, busName, direction } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-row gap-10">
      {item.departures?.map((item) => (
        <TouchableOpacity
          key={item.busRouteId}
          onPress={() =>
            router.push({
              pathname: "/buses/bus-route",
              params: {
                busId: busId,
                busStopId: busStopId,
                busName: busName,
                direction: direction,
                busRouteId: item.busRouteId,
              },
            })
          }
          className="flex-row items-end"
        >
          <Text className="text-text-primary text-xl font-bold">
            {String(item.minute).padStart(2, "0")}
          </Text>
          {item.routeInfo?.map((info) => (
            <Text
              key={item.busRouteId + info}
              className="text-base text-text-primary"
            >
              {routeInfo[info]}
            </Text>
          ))}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const Tab = ({ route }) => {
  const { data } = route.props;

  return (
    <View>
      <ScrollView>
        <DataTable style={{ height: 500 }}>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 1 }}>
              <Text className="text-gray-500">Godziny</Text>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 3 }}>
              <Text className="text-gray-500">Minuty</Text>
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView nestedScrollEnabled>
            {data?.map((item) => (
              <DataTable.Row key={item.departures[0].busRouteId}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Text className="text-text-primary text-xl">{item.hour}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 3 }}>
                  {renderDepartureButtons(item)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
        <View className="p-4">
          {infoDescription.map((item) => (
            <Text key={item.key} className="text-text-primary">
              {item.key} - {item.description}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const TabNavigator: React.FC<TabNavigatorProps> = ({ data }) => {
  const [index, setIndex] = useState<number>(0);

  const [routes] = useState([
    { key: "first", title: "Pn - Pt", props: { data: data[0] } },
    { key: "second", title: "Sb", props: { data: data[1] } },
    { key: "third", title: "Nd", props: { data: data[2] } },
  ]);

  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row bg-background">
        {props.navigationState.routes.map((route: any, i: number) => (
          <TouchableOpacity
            key={route.key}
            className={`flex-1 items-center p-4 border-b-primary ${
              index === i ? "border-b-4" : "border-b-0"
            }`}
            onPress={() => setIndex(i)}
          >
            <Text
              className={`${index === i ? "text-primary" : "text-gray-500"} ${
                index === i ? "font-bold" : "font-normal"
              }`}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1">
      <TabView
        navigationState={{ index, routes }}
        renderScene={Tab}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default TabNavigator;
