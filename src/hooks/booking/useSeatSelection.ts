import { useState } from 'react';
const useSeatSelection = (bookedSeats: string[]) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    
    const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };
    return { selectedSeats, toggleSeat  };
}

export default useSeatSelection;