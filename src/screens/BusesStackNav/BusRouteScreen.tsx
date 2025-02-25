import { View } from "react-native";
import { Text } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import { ThemeContext } from "../../Layout";

//import components
import TabNavigator from "../../components/TabNavigator";

const BusRouteScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { busId, busName } = route.params;
  const [data, setData] = useState(null);
  function getBusRouteDirections(busId) {
    fetch(`${api.getBusRouteDirectionByBusId}${busId}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getBusRouteDirections(busId);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Wybierz przystanek"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={{ padding: 20, gap: 20 }}>
        <Text variant="displayMedium">Linia {busName}</Text>
        {data != null && (
          <Text style={{ fontSize: 22, width: "80%" }}>
            {data[0].name} - {data[1].name}
          </Text>
        )}
      </View>

      {data != null && <TabNavigator data={data} bus={route.params} />}
    </View>
  );
};

export default BusRouteScreen;
