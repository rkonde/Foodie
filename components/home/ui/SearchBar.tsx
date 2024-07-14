import { Pressable, TextInput, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] my-2">
      <TextInput
        placeholder="Serach any recipe"
        placeholderTextColor={"gray"}
        style={{ fontSize: hp(1.7) }}
        className="flex-1 text-base mb-1 pl-3 tracking-wider"
        value={value}
        onChangeText={onChange}
      />
      <Pressable onPress={onSearch} className="bg-white rounded-full p-3">
        <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={3} />
      </Pressable>
    </View>
  );
};

export default SearchBar;
