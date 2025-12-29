import apiClient from "./apiClient";
import { API_CONFIG } from "../constants/app.constants";
import type { CreateBookingRequest } from "../types/request/BookingRequest";
import type { BookingResource } from "../types/response/BookingRespones";
import type { PaymentResponse } from "../types/response/PaymentRespones";
export const createBooking = async (payload: CreateBookingRequest): Promise<BookingResource> => {
  const response = await apiClient.post(API_CONFIG.ENDPOINTS.BOOKING.CREATE, payload);
    return response.data.data;
}

export const fetchAllBooking = async (): Promise<BookingResource[]> => {
  const response = await apiClient.get(API_CONFIG.ENDPOINTS.BOOKING.GET_ALL);
    return response.data.data;
}

export const createPayment = async (
  idBooking: number | string
): Promise<PaymentResponse> => {
  const response = await apiClient.post(
    API_CONFIG.ENDPOINTS.BOOKING.CREATE_PAYMENT(idBooking)
  );

  return response.data; 
};