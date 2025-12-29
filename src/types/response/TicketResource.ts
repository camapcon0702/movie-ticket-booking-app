export type TicketStatus =
  | "HELD"
  | "CONFIRMED"
  | "CANCELLED";

export interface TicketResource {
  id: number;            
  price: number;         
  seatName: string;
  auditoriumName: string;
  status: TicketStatus;  
}