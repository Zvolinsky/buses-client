import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import localhost from "../../constants/localhost";

const DeparturesScreen = () => {
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    fetch(`${localhost}${entity}get-departures`)
      .then((response) => response.json())
      .then((json) => {
        setDepartures(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View>
      {departures.map((item, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <Text>{item.hour} </Text>
          <Text>{item.minute}</Text>
        </View>
      ))}
    </View>
  );
};

export default DeparturesScreen;
