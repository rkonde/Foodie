import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type HeaderProps = {
  title: string;
  area: string;
};

const Header = ({ title, area }: HeaderProps) => {
  return (
    <View className="gap-2">
      <Text
        className="font-bold flex-1 text-neutral-700"
        style={{ fontSize: hp(3) }}
      >
        {title}
      </Text>
      <Text
        className="font-medium flex-1 text-neutral-500"
        style={{ fontSize: hp(2) }}
      >
        {area}
      </Text>
    </View>
  );
};

export default Header;
