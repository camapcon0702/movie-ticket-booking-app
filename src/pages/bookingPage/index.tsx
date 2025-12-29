import React from "react";
import { useEffect, useState } from 'react';
import { SeatGrid } from "../../components/booking/SeatGrid";
import {useSeatSelection, useRenderSeat, formatVND } from "../../hooks/booking/useSeatSelection";
import { ChevronRight, Film } from "lucide-react";
import {fetchSeatsByShowtimeId} from "../../services/showtime";
import { useParams,useNavigate } from "react-router-dom";

const seatsPerRow = 4;
const BookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const showtimeId = id ? Number(id) : null;
  const [seatData, setSeatData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { bookedSeats } = useRenderSeat(seatData);
  const {selectedSeats, toggleSeat, totalPrice, selectedSeatLabels } = useSeatSelection();
  
  const handleCheckout = () => {
    try {
    if (selectedSeats.length === 0 || !showtimeId) return;
    const bookingStr = localStorage.getItem('Booking');
    const booking = bookingStr ? JSON.parse(bookingStr) : null;
 
    const pendingBooking = {
      selectedSeats,
      movieName : booking.movieName,
      showTime : booking.showTime,
      movieTime : booking.movieTime
    }
    
    localStorage.setItem('PendingBooking', JSON.stringify(pendingBooking));
    navigate('/checkout');
    } catch (err) { }
  }

  useEffect(() => {
    if(!showtimeId) {
      setError('Không tìm thấy ID suất chiếu');
      setLoading(false);
      return;
    }
    const loadSeats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSeatsByShowtimeId(showtimeId);
        setSeatData(data);
      } catch (err: any) {
        setError(err.message || 'Không tải được thông tin chỗ ngồi');
      } finally {
        setLoading(false);
      }
    }
    loadSeats();
  }, [showtimeId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !seatData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        <div className="text-center">
          <Film className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-red-400 text-lg">{error || 'Không tìm thấy phim'}</p>
        </div>
      </div>
    );
  }
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
                background: 'linear-gradient(to right, transparent, #F84565, transparent)'
              }}
            />
            <div 
              className="h-16" 
              style={{
                background: 'linear-gradient(to bottom, rgba(248, 69, 101, 0.2), transparent)',
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
              seats={seatData}
              selectedSeats={selectedSeats}
              bookedSeats={bookedSeats}
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
                <div className="w-6 h-6 rounded-lg bg-yellow-400 border-2 border-yellow-300" />
                <span className="text-sm text-gray-400">Vip</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#F84565] border-2 border-pink-400" />
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
              <button onClick={() => handleCheckout()}
                disabled={selectedSeats.length === 0}
                className="group flex items-center gap-3 px-10 py-4 bg-[#F84565] rounded-full hover:opacity-90 transition font-bold text-lg shadow-lg shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Proceed to checkout</span>
                <ChevronRight className="group-hover:translate-x-1 transition" size={24} />
              </button>
            </div>

            {selectedSeats.length > 0 && (
              <div className="mt-6 text-center">
               <p className="text-gray-400">
                Selected Seats:{" "}
                <span className="text-pink-500 font-semibold">
                 {selectedSeatLabels.join(', ')}
                </span>
              </p>
                <p className="text-gray-400 mt-1">
                  Total: <span className="text-white font-bold">{selectedSeats.length} seat(s) : {formatVND(totalPrice)} </span>
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