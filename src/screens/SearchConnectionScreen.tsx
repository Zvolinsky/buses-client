import { View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../Layout";
import Map from "../components/Map";

const SearchConnectionScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [settingPoint, setSettingPoint] = useState<string>("A");
  const [mapShow, setMapShow] = useState<boolean>(false);
  const handleSwapPoints = () => {
    const valueA = Number.parseFloat(pointA).toFixed(3);
    const valueB = Number.parseFloat(pointB).toFixed(3);
    setPointA(valueB);
    setPointB(valueA);
  };
  const handleSetPointA = (value) => {
    setPointA(value);
  };
  const handleSetPointB = (value) => {
    setPointB(value);
  };
  const handleShowMap = (point) => {
    point === settingPoint ? setMapShow((s) => !s) : setSettingPoint(point);
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 20 }}>
        <TextInput
          label="Z miejsca"
          value={
            pointA
              ? Number.parseFloat(pointA?.latitude).toFixed(5) +
                ", " +
                Number.parseFloat(pointA?.longitude).toFixed(5)
              : ""
          }
          onChangeText={(e) => setPointA(e)}
          left={
            <TextInput.Icon
              color="#8C8C8C"
              icon="alpha-a-circle-outline"
              size={30}
            />
          }
          right={
            <TextInput.Icon
              color="#8C8C8C"
              icon="map-search"
              size={30}
              onPress={() => handleShowMap("A")}
            />
          }
        />
        <IconButton
          icon="arrow-up-down"
          style={{ alignSelf: "center" }}
          size={30}
          onPress={() => handleSwapPoints()}
        />
        <TextInput
          label="Do miejsca"
          value={
            pointB
              ? Number.parseFloat(pointB?.latitude).toFixed(5) +
                ", " +
                Number.parseFloat(pointB?.longitude).toFixed(5)
              : ""
          }
          onChangeText={(e) => setPointB(e)}
          left={
            <TextInput.Icon
              color="#8C8C8C"
              icon="alpha-b-circle-outline"
              size={30}
            />
          }
          right={
            <TextInput.Icon
              color="#8C8C8C"
              icon="map-search"
              size={30}
              onPress={() => handleShowMap("B")}
            />
          }
        />
      </View>
      {mapShow && (
        <Map
          setter={true}
          point={settingPoint === "A" ? pointA : pointB}
          setPoint={settingPoint === "A" ? handleSetPointA : handleSetPointB}
        />
      )}
    </View>
  );
};

export default SearchConnectionScreen;
