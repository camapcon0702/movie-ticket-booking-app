import type { OrderFoodRequest } from "./OrderFoodRequest";

export interface CreateBookingRequest {
  showtimeId: number;
  voucherId?: number | null;
  seatId: string[];
  orders: OrderFoodRequest[];
}