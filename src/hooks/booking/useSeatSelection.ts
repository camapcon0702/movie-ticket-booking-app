import { useMemo, useState } from 'react';
import type { Seat } from '../../types/Seat';
export const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
export const  useSeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    
    const toggleSeat = (seat: Seat) => {
    if (seat.isBooked) return;

    setSelectedSeats(prev =>
      prev.some(s => s.id === seat.id)
      ? prev.filter(s => s.id !== seat.id)
      : [...prev, seat]
      );
  };
   const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    }, [selectedSeats]);

    const selectedSeatLabels = useMemo(() => {
    return selectedSeats.map(
      seat => `${seat.rowName}${seat.seatNumber}`
    );
  }, [selectedSeats]);

    return { selectedSeats, toggleSeat, totalPrice, selectedSeatLabels };
}

export const useRenderSeat = (seat :Seat[]) => {
  return useMemo(() => {
    const rowSet = new Set<string>();
    const bookedSet = new Set<Seat>();
      seat.forEach(seat => {
      rowSet.add(seat.rowName);
      if (seat.isBooked) {
        bookedSet.add(seat);
      }
    });

    return {
      rows: Array.from(rowSet),
      bookedSeats: Array.from(bookedSet),
      
    };
  }, [seat]);
  
}

