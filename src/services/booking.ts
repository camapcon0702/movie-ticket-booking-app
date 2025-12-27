import apiClient from "./apiClient";
import { API_CONFIG } from "../constants/app.constants";
import type { CreateBookingRequest } from "../types/request/bookingRequest";

export const createBooking = async (payload: CreateBookingRequest): Promise<void> => {
  const response = await apiClient.post(API_CONFIG.ENDPOINTS.BOOKING.CREATE, payload);
    return response.data.data;
}