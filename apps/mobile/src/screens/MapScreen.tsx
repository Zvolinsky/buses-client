import { View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import api from "../services/api";
import { ThemeContext } from "../Layout";
import Map from "../components/Map";
import { BusStop } from "../types/databaseTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreenNameList } from "../../App";

type MapProps = NativeStackScreenProps<RootScreenNameList, "Map">;

const MapScreen: React.FC<MapProps> = () => {
  const { theme } = useContext(ThemeContext);
  const [busStops, setBusStops] = useState<BusStop[]>([
    {
      id: 17,
      latitude: 50.1101542,
      longitude: 22.0558011,
      name: "JASIONKA, AEROKLUB",
    },
    {
      id: 18,
      latitude: 50.1161332,
      longitude: 22.0367595,
      name: "JASIONKA, BORG",
    },
    {
      id: 19,
      latitude: 50.115401,
      longitude: 22.0245851,
      name: "JASIONKA, PORT LOTNICZY",
    },
    { id: 15, latitude: 50.0918822, longitude: 22.0497197, name: "NOWA WIEŚ" },
    {
      id: 16,
      latitude: 50.0975811,
      longitude: 22.0532173,
      name: "NOWA WIEŚ, PORT LOTNICZY",
    },
    {
      id: 1,
      latitude: 50.0421564,
      longitude: 22.0026264,
      name: "RZESZÓW D.A.",
    },
    {
      id: 9,
      latitude: 50.073216,
      longitude: 22.023555,
      name: "RZESZÓW, LUBELSKA GRANICA",
    },
    {
      id: 4,
      latitude: 50.052803,
      longitude: 22.003556,
      name: "RZESZÓW, LUBELSKA KOŚCIÓŁ",
    },
    {
      id: 8,
      latitude: 50.070925,
      longitude: 22.019521,
      name: "RZESZÓW, LUBELSKA MPK",
    },
    {
      id: 7,
      latitude: 50.068092,
      longitude: 22.014559,
      name: "RZESZÓW, LUBELSKA OGR.HISZP.",
    },
    {
      id: 6,
      latitude: 50.063846,
      longitude: 22.011245,
      name: "RZESZÓW, LUBELSKA OGRODY",
    },
    {
      id: 3,
      latitude: 50.049731,
      longitude: 22.001246,
      name: "RZESZÓW, LUBELSKA SZPITAL",
    },
    {
      id: 5,
      latitude: 50.0583653,
      longitude: 22.0072997,
      name: "RZESZÓW, LUBELSKA/BOROWA",
    },
    {
      id: 2,
      latitude: 50.046609,
      longitude: 21.999736,
      name: "RZESZÓW, MARSZAŁKOWSKA 02/03",
    },
    {
      id: 20,
      latitude: 50.1205966,
      longitude: 22.0259937,
      name: "TAJĘCINA 04/05",
    },
    {
      id: 10,
      latitude: 50.0787829,
      longitude: 22.0295291,
      name: "TRZEBOWNISKO 02/01",
    },
    {
      id: 14,
      latitude: 50.0889086,
      longitude: 22.0471877,
      name: "TRZEBOWNISKO, PŁYWALNIA",
    },
    {
      id: 13,
      latitude: 50.0841742,
      longitude: 22.0428708,
      name: "TRZEBOWNISKO, SKRZYŻ.",
    },
    {
      id: 12,
      latitude: 50.0799707,
      longitude: 22.0399725,
      name: "TRZEBOWNISKO, URZĄD GMINY",
    },
    {
      id: 11,
      latitude: 50.0779442,
      longitude: 22.0364974,
      name: "TRZEBOWNISKO, WIEŚ",
    },
  ]);
  useEffect(() => {
    fetch(api.getAllBusStops)
      .then((response) => response.json())
      .then((json) => {
        setBusStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Map setter={false} busStops={busStops} />
    </View>
  );
};

export default MapScreen;
