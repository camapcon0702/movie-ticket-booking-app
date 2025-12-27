export type SeatStatus = 'available' | 'selected' | 'booked' | 'vip';
export interface Seat {
    id: string;
    rowChart: string;
    seatNumber: number;
    status: SeatStatus;
}