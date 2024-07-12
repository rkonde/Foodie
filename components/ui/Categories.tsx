import { Category } from "@/types/Category";
import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type CategoriesProps = {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const Categories = ({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoriesProps) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-4"
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="flex items-center gap-1"
            onPress={() => setActiveCategory(category.strCategory)}
          >
            <View
              className={
                "rounded-full p-2 " +
                (activeCategory === category.strCategory
                  ? "bg-amber-400"
                  : "bg-black/10")
              }
            >
              <Image
                source={{ uri: category.strCategoryThumb }}
                style={{ width: hp(6), height: hp(6) }}
                className="rounded-full"
                contentFit="contain"
              />
            </View>
            <Text className="text-neutral-600">{category.strCategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
