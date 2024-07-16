import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type BackButtonProps = {
  onPress: () => void;
};

const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-2 rounded-full ml-5 bg-white"
    >
      <ChevronLeftIcon size={hp(3.5)} color={"#fbbf24"} strokeWidth={4.5} />
    </TouchableOpacity>
  );
};

export default BackButton;
