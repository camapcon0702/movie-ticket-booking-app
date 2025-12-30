import type { OrderFoodResource } from "./OrderFoodResource";
import type { TicketResource } from "./TicketResource";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SUCCESS"
  | "CANCELLED";

export interface BookingResource {
  id: number;                 
  total: number;              
  nameMovie: string;
  startTime: string;         
  status: BookingStatus;      
  tickets: TicketResource[];
  orderedFoods: OrderFoodResource[];
}