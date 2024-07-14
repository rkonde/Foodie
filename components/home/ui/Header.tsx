import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Header = () => {
  return (
    <View className="mx-4 gap-2 mb-2">
      <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
        Hello Foodie!
      </Text>
      <View>
        <Text
          style={{ fontSize: hp(3.8) }}
          className="font-semibold text-neutral-600"
        >
          Make your own food,
        </Text>
      </View>
      <Text
        style={{ fontSize: hp(3.8) }}
        className="font-semibold text-neutral-600"
      >
        stay at <Text className="text-amber-400">home</Text>
      </Text>
    </View>
  );
};

export default Header;
