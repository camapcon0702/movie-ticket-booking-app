export type SeatStatus = 'available' | 'selected' | 'booked' | 'vip' |  "unavailable" | "occupied" | "regular";
export interface Seat {
    id: string;
    rowName: string;
    seatNumber: number;
    isBooked: Boolean;
    price: number;
    seatType:string;
    available: Boolean;
}