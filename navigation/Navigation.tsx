import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import Home from "@/components/home/Home";
import SplashScreen from "@/components/splash/SplashScreen";
import { RootStackParamList } from "@/navigation/types";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
