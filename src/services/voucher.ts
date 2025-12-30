import apiClient from "./apiClient";
import { API_CONFIG } from "../constants/app.constants";
import type { VoucherResponse } from "../types/response/VoucherRespones"; 
import type { ApiResponse } from "../types/ApiResponse";

export const fetchAllVouchers = async (): Promise<VoucherResponse[]> => {
    const response = await apiClient.get<ApiResponse<VoucherResponse[]>>(API_CONFIG.ENDPOINTS.VOUCHER.GET_ALL);
    return response.data.data;
}