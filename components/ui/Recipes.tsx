import { RecipePreview } from "@/types/RecipePreview";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loading from "./Loading";

type RecipesProps = {
  recipes: RecipePreview[];
};

const Recipes = ({ recipes }: RecipesProps) => {
  const navigation = useNavigation();

  return (
    <View className="m-4 gap-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View className="flex-row flex-wrap w-full justify-center">
        {recipes.length === 0 ? (
          <Loading />
        ) : (
          recipes.map((recipe, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 100)
                .duration(600)
                .springify()
                .damping(12)}
              className={"w-[46%] gap-2 m-2 rounded-lg"}
            >
              <Pressable
                className="w-ful"
                onPress={() => {
                  navigation.navigate("Recipe", recipe);
                }}
              >
                <Animated.Image
                  sharedTransitionTag={recipe.strMeal}
                  source={{ uri: recipe.strMealThumb }}
                  style={{ width: "100%", height: hp(25), borderRadius: 24 }}
                />
                <View className="flex-1">
                  <Text
                    style={{ fontSize: hp(1.7) }}
                    className="text-neutral-600"
                  >
                    {recipe.strMeal.length > 20
                      ? recipe.strMeal.slice(0, 20) + "..."
                      : recipe.strMeal}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          ))
        )}
      </View>
    </View>
  );
};

export default Recipes;
