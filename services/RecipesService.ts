import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (response && response.data) {
      return response.data.categories;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const fetchRecipes = async (activeCategory: string) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
    );

    if (response && response.data) {
      return response.data.meals;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const fetchRecipesByName = async (name: string) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    if (response && response.data) {
      return response.data.meals;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
