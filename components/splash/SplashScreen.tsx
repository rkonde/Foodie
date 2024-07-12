import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const SplashScreen = () => {
  const navigation = useNavigation();

  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      ring1Padding.value = withSpring(hp(5));
    }, 100);

    setTimeout(() => {
      ring2Padding.value = withSpring(hp(5.5));
    }, 300);

    setTimeout(() => {
      navigation.navigate("Home");
    }, 1500);
  }, []);

  const ring1AnimatedStyle = useAnimatedStyle(() => {
    return {
      padding: ring1Padding.value,
    };
  });

  const ring2AnimatedStyle = useAnimatedStyle(() => {
    return {
      padding: ring2Padding.value,
    };
  });

  return (
    <View className="flex-1 justify-center items-center gap-20 bg-amber-500">
      <StatusBar style="light" backgroundColor="#f59e0b" />

      <Animated.View
        className="bg-white/20 rounded-full"
        style={ring1AnimatedStyle}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={ring2AnimatedStyle}
        >
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center gap-2">
        <Text
          className="font-bold text-white tracking-widest text-6xl"
          style={{ fontSize: hp(7) }}
        >
          Foodie
        </Text>
        <Text
          className="font-medium text-white tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Food to die for
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
