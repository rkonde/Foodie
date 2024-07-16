import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import BackButton from "@/components/recipe/ui/BackButton";
import Header from "@/components/recipe/ui/Header";
import Ingredients from "@/components/recipe/ui/Ingredients";
import Steps from "@/components/recipe/ui/Stepts";
import Video from "@/components/recipe/ui/Video";
import Loading from "@/components/ui/Loading";
import { RootStackScreenProps } from "@/navigation/types";
import { fetchRecipeDetails } from "@/services/RecipesService";
import { RecipeDetails } from "@/types/RecipeDetails";

const Recipe = () => {
  const navigation = useNavigation();
  const {
    params: { idMeal, strMeal, strMealThumb },
  } = useRoute<RootStackScreenProps<"Recipe">["route"]>();

  const [recipe, setRecipe] = useState<RecipeDetails>();

  useEffect(() => {
    loadRecipeData(idMeal);
  }, [idMeal]);

  const loadRecipeData = async (idMeal: string) => {
    setRecipe(await fetchRecipeDetails(idMeal));
  };

  const getIngredientsWithMeasures = (recipe: RecipeDetails) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}` as keyof RecipeDetails;
      const measureKey = `strMeasure${i}` as keyof RecipeDetails;

      if (recipe[ingredientKey] && recipe[measureKey]) {
        ingredients.push({
          ingredient: recipe[ingredientKey]!.trim(),
          measure: recipe[measureKey]!.trim(),
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
        <BackButton onPress={() => navigation.goBack()} />
      </Animated.View>

      {recipe === undefined ? (
        <Loading />
      ) : (
        <Animated.View
          entering={FadeInDown.springify().damping(12).duration(600)}
          className="px-4 flex justify-between gap-4 pt-8"
        >
          <Header title={recipe.strMeal} area={recipe.strArea} />

          <Ingredients ingredients={getIngredientsWithMeasures(recipe)} />

          <Steps steps={getSteps(recipe)} />

          {recipe?.strYoutube && <Video videoUrl={recipe.strYoutube} />}
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default Recipe;
