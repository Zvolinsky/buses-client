import { TouchableOpacity, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect } from "react";
import { defaultLocationRzeszow } from "../constants/defaultCitiesCoords";

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

type MarkerProps = {
  latitude: number;
  longitude: number;
};

const Map: React.FC<MapProps> = ({ setter, point, setPoint, busStops }) => {
  const handleSetPoint = setPoint;
  const [markerPos, setMarkerPos] = React.useState<MarkerProps>({
    latitude: 50.041187,
    longitude: 21.999121,
  });
  const [zoom, setZoom] = React.useState<number | null>(null);
  useEffect(() => {
    if (point) {
      setMarkerPos(point);
    }
  }, [point]);
  return (
    <View className="flex-1 gap-3">
      {setter && (
        <TouchableOpacity
          className="bg-primary p-3 items-center rounded-xl self-center w-1/2"
          onPress={() => {
            handleSetPoint(markerPos);
          }}
        >
          <Text className="font-bold text-white dark:text-black">Ustaw</Text>
        </TouchableOpacity>
      )}
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
    </View>
  );
};

export default Map;
