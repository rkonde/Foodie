import { RecipePreview } from "@/types/RecipePreview";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
  Recipe: RecipePreview;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
