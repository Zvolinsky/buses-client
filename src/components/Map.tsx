import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect } from "react";
import { defaultLocationRzeszow } from "../constants/defaultCitiesCoords";
import { Button, Icon, IconButton, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/Fontisto";

type MapProps = {
  setter: Boolean;
  point?: { latitude: number; longitude: number };
  setPoint?: (point: { latitude: number; longitude: number }) => void;
  busStops?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  }[];
};

const Map = ({ setter, point, setPoint, busStops }: MapProps) => {
  const handleSetPoint = setPoint;
  const [markerPos, setMarkerPos] = React.useState({
    latitude: 50.041187,
    longitude: 21.999121,
  });
  const [zoom, setZoom] = React.useState(null);
  useEffect(() => {
    if (point) {
      setMarkerPos(point);
    }
  }, [point]);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: setter ? "90%" : "100%" }}
        initialRegion={defaultLocationRzeszow}
        onPress={(data) => setMarkerPos(data.nativeEvent.coordinate)}
        onRegionChange={(region) => setZoom(region.latitudeDelta)}
      >
        <Marker coordinate={markerPos} title="Map Marker" />
        {busStops &&
          zoom < 0.045 &&
          busStops.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              icon={require("../../assets/pin (1).png")}
              title={item.name}
              style={{
                backgroundColor: "red",
              }}
            ></Marker>
          ))}
      </MapView>
      {setter && (
        <Button
          mode="contained"
          onPress={() => {
            handleSetPoint(markerPos);
          }}
        >
          <Text>Ustaw</Text>
        </Button>
      )}
    </View>
  );
};

export default Map;
