export interface VoucherResponse {
    id: number;
    code: string;
    discountAmount: number;
    discountPercentage: number;
    discountMax : number;
    expiryDate : string;
    active : boolean;
}