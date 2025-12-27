import React from "react";
import { SeatGrid } from "../../components/booking/SeatGrid";
import useSeatSelection from "../../hooks/booking/useSeatSelection";
import { ChevronRight } from "lucide-react";

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const seatsPerRow = 16;
const bookedSeats = ['C7', 'D5', 'D6', 'F5', 'F6', 'F7'];

const BookingPage = () => {
  const { selectedSeats, toggleSeat } = useSeatSelection(bookedSeats);

  const getSeatStatus = (id: string) => {
    if (selectedSeats.includes(id)) return "selected";
    if (bookedSeats.includes(id)) return "booked";
    return "available";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          
          <div className="col-span-3">
           
          </div>

          <div className="col-span-9">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Select Your Seat</h2>
              <p className="text-gray-400">Choose your preferred seats for the best experience</p>
            </div>

            <div className="mb-12">
              <div className="relative h-20 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-4xl">
                    <div 
                      className="h-1 rounded-full" 
                      style={{
                        background: 'linear-gradient(to right, transparent, rgb(236, 72, 153), transparent)'
                      }}
                    />
                    <div 
                      className="h-16" 
                      style={{
                        background: 'linear-gradient(to bottom, rgba(236, 72, 153, 0.2), transparent)',
                        borderBottomLeftRadius: '100%',
                        borderBottomRightRadius: '100%'
                      }}
                    />
                  </div>
                </div>
                <span className="relative text-sm font-semibold text-gray-400 bg-gray-900/80 px-4 py-1 rounded-full">
                  SCREEN SIDE
                </span>
              </div>
            </div>
            <SeatGrid
              rows={rows}
              seatsPerRow={seatsPerRow}
              getSeatStatus={getSeatStatus}
              onSeatClick={toggleSeat}
            />
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-6" />
              <div className="flex gap-2">
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const num = i + 1;
                  if (num === 9) {
                    return (
                      <React.Fragment key={num}>
                        <div className="w-8" />
                        <span className="w-8 text-center text-xs text-gray-500">{num}</span>
                      </React.Fragment>
                    );
                  }
                  return (
                    <span key={num} className="w-8 text-center text-xs text-gray-500">
                      {num}
                    </span>
                  );
                })}
              </div>
              <span className="w-6" />
            </div>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gray-700/60 border-2 border-gray-600" />
                <span className="text-sm text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-pink-500 border-2 border-pink-400" />
                <span className="text-sm text-gray-400">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-lg border-2" 
                  style={{ 
                    backgroundColor: 'rgba(131, 24, 67, 0.6)',
                    borderColor: 'rgba(159, 18, 57, 0.8)'
                  }}
                />
                <span className="text-sm text-gray-400">Booked</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                disabled={selectedSeats.length === 0}
                className="group flex items-center gap-3 px-10 py-4 bg-pink-500 rounded-full hover:opacity-90 transition font-bold text-lg shadow-lg shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Proceed to checkout</span>
                <ChevronRight className="group-hover:translate-x-1 transition" size={24} />
              </button>
            </div>

            {selectedSeats.length > 0 && (
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Selected Seats: <span className="text-pink-500 font-semibold">{selectedSeats.join(', ')}</span>
                </p>
                <p className="text-gray-400 mt-1">
                  Total: <span className="text-white font-bold">{selectedSeats.length} seat(s)</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;