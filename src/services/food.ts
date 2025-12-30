import apiClient from "./apiClient";
import { API_CONFIG } from "../constants/app.constants";
import type { FoodResponse } from "../types/response/FoodRespones"; 
import type { ApiResponse } from "../types/ApiResponse";

export const fetchAllFoods = async (): Promise<FoodResponse[]> => {
    const response = await apiClient.get<ApiResponse<FoodResponse[]>>(API_CONFIG.ENDPOINTS.FOOD.GET_ALL);
    return response.data.data;
}