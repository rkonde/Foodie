import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type IngredientsProps = {
  ingredients: {
    ingredient: any;
    measure: any;
  }[];
};

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <View className="gap-4">
      <Text
        className="font-bold flex-1 text-neutral-700"
        style={{ fontSize: hp(2.5) }}
      >
        Ingredients
      </Text>
      <View className="gap-2 ml-3">
        {ingredients.map((ingredient, index) => (
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
  );
};

export default Ingredients;
