import { View, Text } from "react-native";

const Loader = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-lg font-semibold text-primary">Ładowanie...</Text>
    </View>
  );
};

export default Loader;
