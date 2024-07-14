import { RootStackScreenProps } from "@/navigation/types";
import { RecipeDetails } from "@/types/RecipeDetails";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Loading from "../ui/Loading";

import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import YoutubePlayer from "react-native-youtube-iframe";

const Recipe = () => {
  const navigation = useNavigation();
  const {
    params: { idMeal, strMeal, strMealThumb },
  } = useRoute<RootStackScreenProps<"Recipe">["route"]>();

  const [recipe, setRecipe] = useState<RecipeDetails>();

  useEffect(() => {
    fetchRecipeData(idMeal);
  }, [idMeal]);

  const getIngredientsWithMeasures = (recipe: RecipeDetails) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: recipe[`strIngredient${i}`].trim(),
          measure: recipe[`strMeasure${i}`].trim(),
        });
      }
    }

    return ingredients;
  };

  const getSteps = (recipe: RecipeDetails) => {
    return recipe.strInstructions
      .split("\n")
      .filter((step) => step.trim().length > 0);
  };

  const fetchRecipeData = async (idMeal: string) => {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );

      setRecipe(data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-80"
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center mt-8">
        <Animated.Image
          sharedTransitionTag={strMeal}
          source={{ uri: strMealThumb }}
          style={{
            width: wp(98),
            height: hp(40),
            borderRadius: 50,
          }}
        />
      </View>

      <Animated.View
        entering={FadeIn.delay(200).duration(600)}
        className="w-full absolute flex-row justify-between items-center top-14"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} color={"#fbbf24"} strokeWidth={4.5} />
        </TouchableOpacity>
      </Animated.View>

      {recipe === undefined ? (
        <Loading />
      ) : (
        <Animated.View
          entering={FadeInDown.springify().damping(12).duration(600)}
          className="px-4 flex justify-between gap-4 pt-8"
        >
          <View className="gap-2">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(3) }}
            >
              {recipe.strMeal}
            </Text>
            <Text
              className="font-medium flex-1 text-neutral-500"
              style={{ fontSize: hp(2) }}
            >
              {recipe.strArea}
            </Text>
          </View>

          <View className="gap-4">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(2.5) }}
            >
              Ingredients
            </Text>
            <View className="gap-2 ml-3">
              {getIngredientsWithMeasures(recipe).map((ingredient, index) => (
                <View key={index} className="flex-row gap-4">
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-amber-300 rounded-full mt-1.5"
                  />
                  <View className="flex-row gap-2">
                    {ingredient.measure && (
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {ingredient.measure}
                      </Text>
                    )}
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-medium text-neutral-600"
                    >
                      {ingredient.ingredient}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="gap-4">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(2.5) }}
            >
              Steps
            </Text>
            <View className="gap-2 ml-3">
              {getSteps(recipe).map((step, index) => (
                <View key={index} className="flex-row gap-4">
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-amber-300 rounded-full mt-1.5"
                  />
                  <View className="flex-row gap-2 mr-8">
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-medium text-neutral-600"
                    >
                      {step}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {recipe?.strYoutube && (
            <View className="gap-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>

              <View>
                <YoutubePlayer
                  height={hp(30)}
                  videoId={recipe.strYoutube.split("=")[1]}
                />
              </View>
            </View>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default Recipe;
