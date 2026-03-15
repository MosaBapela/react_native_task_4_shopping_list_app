import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CategoriesScreen from "../screens/CategoriesScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export type RootStackParamList = {
  Welcome: undefined;
  Categories: undefined;
  ShoppingList: { category: string; categoryName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
    </Stack.Navigator>
  );
}
