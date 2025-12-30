import apiClient from "./apiClient";
import { API_CONFIG } from "../constants/app.constants";

import type { ApiResponse } from "../types/ApiResponse";
import type { Movie } from "../types/Movie";
export const fetchMovieById = async (id: number | string): Promise<Movie> => {
    const response = await apiClient.get<ApiResponse<Movie>>(API_CONFIG.ENDPOINTS.MOVIE.GET_BY_ID(id));
    return response.data.data;
}