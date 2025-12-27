import apiClient from "./apiClient";
import { API_CONFIG } from "../constants/app.constants";
import type { Showtime } from "../types/Showtime"; 
import type { ApiResponse } from "../types/ApiResponse";
export const fetchShowtimeById = async (id: number | string): Promise<Showtime> => {
    const response = await apiClient.get<ApiResponse<Showtime>>(API_CONFIG.ENDPOINTS.SHOWTIME.GET_BY_ID(id));
    return response.data.data;
}

export const fetchShowtimeByMovieId = async (
  id: number | string
): Promise<Showtime[]> => {
  const response = await apiClient.get<ApiResponse<Showtime[]>>(
    API_CONFIG.ENDPOINTS.SHOWTIME.GET_BY_MOVIE(id)
  );
  return response.data.data;
};
