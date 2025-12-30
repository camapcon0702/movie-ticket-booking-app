import { useEffect, useState } from 'react';
import {  Minus, Plus } from "lucide-react";
import { fetchAllFoods } from "../../services/food";
import type { FoodResponse } from '../../types/response/FoodRespones';
import type { FoodOrderItem } from '../../hooks/food/useFoodOrder';
import { formatVND } from '../../utils/formatters';

interface FoodGridProps {
  orderedFoods: Map<number, FoodOrderItem>;
  updateFoodOrder: (food: FoodResponse, quantity: number) => void;
}

const FoodGrid = ({ orderedFoods, updateFoodOrder }: FoodGridProps) => {
  const [foodData, setFoodData] = useState<FoodResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        const data = await fetchAllFoods();
        setFoodData(data);
      } catch (err: any) {
        setError(err.message || "Không tải được đồ ăn");
      } finally {
        setLoading(false);
      }
    };
    loadFoods();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Đồ ăn & Nước uống</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {foodData.map(food => {
          const quantity =
            orderedFoods.get(food.id)?.quantity || 0;

          return (
            <div
              key={food.id}
              className="flex gap-3 p-3 bg-gray-700/50 rounded-lg"
            >
              <img
                src={food.imgUrl}
                className="w-16 h-16 rounded-lg"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm">
                    {food.name}
                  </h3>
                  <p className="text-[#F84565]font-bold text-sm">
                    {formatVND(food.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateFoodOrder(food, quantity - 1)
                    }
                    className="w-7 h-7 bg-gray-600 rounded"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="w-6 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateFoodOrder(food, quantity + 1)
                    }
                    className="w-7 h-7 bg-[#F84565] rounded"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodGrid;