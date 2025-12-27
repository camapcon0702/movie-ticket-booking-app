import apiClient from "./apiClient";
import { API_CONFIG } from "../constants/app.constants";
import type { Movie } from '../types/movie';
import type { ApiResponse } from "../types/ApiResponse";
export const fetchMovieById = async (id: number | string): Promise<Movie> => {
    const response = await apiClient.get<ApiResponse<Movie>>(API_CONFIG.ENDPOINTS.MOVIE.GET_BY_ID(id));
    return response.data.data;
}