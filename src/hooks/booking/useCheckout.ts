import { useMemo } from "react";
import type { VoucherResponse } from "../../types/response/VoucherRespones";
import type { FoodOrderItem } from "../food/useFoodOrder";
import type { Seat } from "../../types/Seat";

import { createBooking } from "../../services/booking";
import type { CreateBookingRequest } from "../../types/request/BookingRequest";
import { handleCreatePayment } from "../../services/payment.helper";

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

  const handleCheckout = async () => {
    if (!mockShowtime?.id) return;

    const payload: CreateBookingRequest = {
      showtimeId: mockShowtime.id,
      seatId: mockSeats.map(s => s.id),
      orders: Array.from(orderedFoods.values()).map(item => ({
        foodId: item.food.id,
        quantity: item.quantity
      })),
      voucherId: selectedVoucher?.id
    };

    try {
      const booking = await createBooking(payload);
      const bookingId = booking.id;

      if (!bookingId) {
        throw new Error("Booking ID not found");
      }
      localStorage.removeItem('Booking');
      localStorage.removeItem('PendingBooking');
      await handleCreatePayment(bookingId);

    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return { subtotal, foodTotal, discount, total, handleCheckout };
};

