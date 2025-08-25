import { TouchableOpacity, Text, View } from "react-native";
import { cssInterop } from "nativewind";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type HeaderProps = {
  title: string;
  leftHeader?: {
    icon: string;
    onPress: () => void;
  };
  rightHeader?: {
    icon: string;
    onPress: () => void;
  };
};

cssInterop(MaterialCommunityIcons, {
  className: {
    target: "style",
    nativeStyleToProp: { height: true, width: true, size: true },
  },
});

const Header = ({ title, leftHeader, rightHeader }: HeaderProps) => {
  //TODO: Dodać obsługę zbyt długiego tytułu
  return (
    <View className="flex-row justify-between items-center p-5">
      <View className="flex-row items-center ">
        {leftHeader && (
          <TouchableOpacity onPress={() => leftHeader.onPress()}>
            <MaterialCommunityIcons
              name={leftHeader.icon}
              size={30}
              className="text-secondary"
            />
          </TouchableOpacity>
        )}
        <Text className="text-2xl left-10 text-text-primary">{title}</Text>
      </View>

      {rightHeader && (
        <TouchableOpacity onPress={() => rightHeader.onPress()}>
          <MaterialCommunityIcons
            name={rightHeader.icon}
            size={30}
            className="text-secondary"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
