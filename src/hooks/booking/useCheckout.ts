import { useMemo } from "react";
import type { VoucherResponse } from "../../types/response/VoucherRespones";
import type { FoodOrderItem } from "../food/useFoodOrder";
import type { Seat } from "../../types/Seat";

export const useCheckout = (
  mockSeats: Seat[],
  orderedFoods: Map<number, FoodOrderItem>,
  selectedVoucher?: VoucherResponse,
  mockShowtime?: { id: number }
) => {
  const subtotal = useMemo(() => {
    return mockSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [mockSeats]);

  const foodTotal = useMemo(() => {
    return Array.from(orderedFoods.values()).reduce(
      (sum, item) => sum + item.food.price * item.quantity,
      0
    );
  }, [orderedFoods]);

  const discount = useMemo(() => {
    if (!selectedVoucher) return 0;
    const totalBefore = subtotal + foodTotal;
    if (selectedVoucher.discountPercentage) {
      const percentDiscount =
        (totalBefore * selectedVoucher.discountPercentage) / 100;
      return Math.min(percentDiscount, selectedVoucher.discountMax ?? Infinity);
    }
    return Math.min(selectedVoucher.discountAmount ?? 0, totalBefore);
  }, [selectedVoucher, subtotal, foodTotal]);

  const total = subtotal + foodTotal - discount;

  const handleCheckout = () => {
    console.log("SEND TO BACKEND:", {
      showtimeId: mockShowtime?.id,
      seats: mockSeats.map(s => s.id),
      foods: Array.from(orderedFoods.values()).map(s => s.food.id),
      voucherId: selectedVoucher?.id
    });
   
  };

  return { subtotal, foodTotal, discount, total, handleCheckout};
};
