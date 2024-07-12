import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  return (
    <View className="flex-1 flex justify-center items-center mt-4">
      <ActivityIndicator size="large" color="#fbbf24" />
    </View>
  );
};

export default Loading;
