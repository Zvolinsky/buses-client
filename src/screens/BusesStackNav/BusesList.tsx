import { View, FlatList } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { ThemeContext } from "../../Layout";
import api from "../../services/api";
import Header from "../../components/Header";

const BusesList = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [buses, setBuses] = useState([
    {
      id: 1,
      number: "108",
    },
    {
      id: 2,
      number: "193",
    },
    {
      id: 3,
      number: "200",
    },
    {
      id: 4,
      number: "201",
    },
    {
      id: 5,
      number: "202",
    },
    {
      id: 6,
      number: "203",
    },
    {
      id: 7,
      number: "204",
    },
    {
      id: 8,
      number: "205",
    },
    {
      id: 9,
      number: "206",
    },
    {
      id: 10,
      number: "207",
    },
    {
      id: 11,
      number: "208",
    },
    {
      id: 12,
      number: "209",
    },
    {
      id: 13,
      number: "210",
    },
    {
      id: 14,
      number: "211",
    },
    {
      id: 15,
      number: "212",
    },
    {
      id: 16,
      number: "213",
    },
    {
      id: 17,
      number: "214",
    },
    {
      id: 18,
      number: "215",
    },
    {
      id: 19,
      number: "216",
    },
    {
      id: 20,
      number: "217",
    },
    {
      id: 21,
      number: "218",
    },
    {
      id: 22,
      number: "219",
    },
    {
      id: 23,
      number: "221",
    },
    {
      id: 24,
      number: "222",
    },
    {
      id: 25,
      number: "223",
    },
    {
      id: 26,
      number: "224",
    },
    {
      id: 27,
      number: "225",
    },
    {
      id: 28,
      number: "226",
    },
    {
      id: 29,
      number: "227",
    },
    {
      id: 30,
      number: "228",
    },
    {
      id: 31,
      number: "230",
    },
    {
      id: 32,
      number: "232",
    },
    {
      id: 33,
      number: "233",
    },
    {
      id: 34,
      number: "234",
    },
    {
      id: 35,
      number: "235",
    },
    {
      id: 36,
      number: "236",
    },
    {
      id: 37,
      number: "237",
    },
    {
      id: 38,
      number: "238",
    },
    {
      id: 39,
      number: "239",
    },
    {
      id: 40,
      number: "240",
    },
    {
      id: 41,
      number: "241",
    },
    {
      id: 42,
      number: "242",
    },
    {
      id: 43,
      number: "246",
    },
    {
      id: 44,
      number: "250",
    },
  ]);
  useEffect(() => {
    fetch(api.getAllBuses)
      .then((response) => response.json())
      .then((json) => {
        setBuses(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
        renderItem={({ item }) => (
          <Button
            key={item.id}
            mode="contained-tonal"
            style={{ height: 40 }}
            onPress={() =>
              navigation.navigate("BusRouteScreen", {
                busId: item.id,
                busName: item.number,
              })
            }
          >
            {item.number}
          </Button>
        )}
        horizontal={false}
        numColumns={4}
      />
    </View>
  );
};

export default BusesList;
