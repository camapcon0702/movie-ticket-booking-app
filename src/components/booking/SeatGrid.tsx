import React from "react";
import { SeatItem } from "./SeatItem";
import type { Seat, SeatStatus } from "../../types/Seat";

interface Props {
  seats: Seat[];
  selectedSeats: Seat[];
  bookedSeats: Seat[]; 
  onSeatClick: (seat: Seat) => void;
}

const SeatGrid = ({
  seats,
  selectedSeats,
  bookedSeats,
  onSeatClick,
}: Props) => {
 
  const groupSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.rowName]) {
      acc[seat.rowName] = [];
    }
    acc[seat.rowName].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  const getSeatStatus = (seat: Seat): SeatStatus => {
    if (selectedSeats.some(s => s.id === seat.id)) return "selected";
    if (bookedSeats.includes(seat)) return "booked";
    if (seat.seatType === "Vip") return "vip";
    return "available";
  };

  return (
    <div className="flex flex-col gap-3">
      {Object.entries(groupSeats).map(([rowName, rowSeats]) => {
        const sortedSeats = [...rowSeats].sort(
          (a, b) => a.seatNumber - b.seatNumber
        );

        return (
          <div key={rowName} className="flex items-center gap-2">
            <div className="w-8 text-center font-semibold text-gray-600">
              {rowName}
            </div>

            <div className="flex gap-2">
              {sortedSeats.map(seat => {
                const isAisle = seat.seatNumber === 9; 

                return (
                  <React.Fragment key={seat.id}>
                    {isAisle && <div className="w-4" />}
                    <SeatItem
                      status={getSeatStatus(seat)}
                      onClick={() => onSeatClick(seat)}
                    />
                  </React.Fragment>
                );
              })}
            </div>

            <div className="w-8 text-center font-semibold text-gray-600">
              {rowName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { SeatGrid };
