import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Header from "@/components/home/ui/Header";
import SearchBar from "@/components/home/ui/SearchBar";
import Categories from "@/components/ui/Categories";
import Recipes from "@/components/ui/Recipes";
import {
  fetchCategories,
  fetchRecipes,
  fetchRecipesByName,
} from "@/services/RecipesService";
import { Category } from "@/types/Category";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].strCategory);
      loadRecipes(categories[0].strCategory);
    }
  }, [categories]);

  const handleCategoryChange = (category: string) => {
    setSearchName("");
    setActiveCategory(category);
    setRecipes([]);
    loadRecipes(category);
  };

  const loadCategories = async () => {
    setCategories(await fetchCategories());
  };

  const loadRecipes = async (activeCategory: string) => {
    setRecipes(await fetchRecipes(activeCategory));
  };

  const loadRecipesByName = async (name: string) => {
    setActiveCategory("");
    setRecipes(await fetchRecipesByName(name));
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
        <Header />

        <SearchBar
          value={searchName}
          onChange={setSearchName}
          onSearch={() => loadRecipesByName(searchName)}
        />

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
