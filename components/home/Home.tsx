import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TextInput, View } from "react-native";

import { Category } from "@/types/Category";
import axios from "axios";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../ui/Categories";
import Recipes from "../ui/Recipes";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].strCategory);
      fetchRecipes(categories[0].strCategory);
    }
  }, [categories]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setRecipes([]);
    fetchRecipes(category);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchRecipes = async (activeCategory: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
      );

      if (response && response.data) {
        setRecipes(response.data.meals);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        contentContainerClassName="gap-4"
        className="pt-14"
      >
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

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] my-2">
          <TextInput
            placeholder="Serach any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={3} />
          </View>
        </View>

        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
          />
        )}

        <Recipes recipes={recipes} />
      </ScrollView>
    </View>
  );
};

export default Home;
