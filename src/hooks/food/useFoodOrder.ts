import { useState } from "react";
import type { FoodResponse } from "../../types/response/FoodRespones";

export interface FoodOrderItem {
  food: FoodResponse;
  quantity: number;
}

export const useFoodOrder = () => {
  const [orderedFoods, setOrderedFoods] =
    useState<Map<number, FoodOrderItem>>(new Map());

  const updateFoodOrder = (food: FoodResponse, quantity: number) => {
    setOrderedFoods(prev => {
      const map = new Map(prev);

      if (quantity <= 0) {
        map.delete(food.id);
      } else {
        map.set(food.id, {
          food,
          quantity
        });
      }

      return map;
    });
  };

  const totalFoodPrice = Array.from(orderedFoods.values())
    .reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  return {
    orderedFoods,
    updateFoodOrder,
    totalFoodPrice
  };
};
