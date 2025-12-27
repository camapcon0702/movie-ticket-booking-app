
import { SeatItem } from "./SeatItem";
import type { SeatStatus } from "../../types/seat";
import React from "react";
interface Props {
  rows: string[];
  seatsPerRow: number;
  getSeatStatus: (id: string) => SeatStatus;
  onSeatClick: (id: string) => void;
}

const SeatGrid = ({
  rows,
  seatsPerRow,
  getSeatStatus,
  onSeatClick,
}: Props) => {
  return (
    <div className="space-y-4 mb-8">
      {rows.map((row) => (
        <div key={row} className="flex items-center justify-center gap-3">
          {/* Row Label Left */}
          <span className="text-gray-400 font-semibold w-6 text-center">
            {row}
          </span>

          {/* Seats */}
          <div className="flex gap-2">
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatNumber = i + 1;
              const id = `${row}${seatNumber}`;
              const status = getSeatStatus(id);

              // Add spacing in middle (aisle)
              if (seatNumber === 9) {
                return (
                  <React.Fragment key={id}>
                    <div className="w-8" />
                    <SeatItem
                      status={status}
                      onClick={() => onSeatClick(id)}
                    />
                  </React.Fragment>
                );
              }

              return (
                <SeatItem
                  key={id}
                  status={status}
                  onClick={() => onSeatClick(id)}
                />
              );
            })}
          </div>

          {/* Row Label Right */}
          <span className="text-gray-400 font-semibold w-6 text-center">
            {row}
          </span>
        </div>
      ))}
    </div>
  );
};

export { SeatGrid };