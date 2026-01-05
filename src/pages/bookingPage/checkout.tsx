import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Film
} from "lucide-react";
import VoucherGrid from "../../components/booking/VoucherGrid";
import FoodGrid from "../../components/booking/FoodGrid";
import type { VoucherResponse } from "../../types/response/VoucherRespones";
import { useFoodOrder } from "../../hooks/food/useFoodOrder";
import { useCheckout } from "../../hooks/booking/useCheckout";
import type { Seat } from "../../types/Seat";
import type { Showtime } from "../../types/Showtime";
import { formatDate, formatTime, formatVND } from "../../utils/formatters";

const Checkout = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVoucher, setSelectedVoucher] =useState<VoucherResponse | null>(null);
  const [mockSeats,setMockSeats] = useState<Seat[]>([]);
  const [mockShowtime,setMockShowtime] = useState<Showtime>();
  const [movieName,setMovieName] = useState();
  const [movieTime,setMovieTime] = useState();
  const { orderedFoods, updateFoodOrder } = useFoodOrder();
  const { subtotal, foodTotal, discount, total, handleCheckout } = 
  useCheckout(mockSeats, orderedFoods, selectedVoucher ?? undefined, mockShowtime);

 const handChangeVoucher = (voucher:VoucherResponse| null) =>{
    setSelectedVoucher(voucher)
 }
  useEffect(() => {
    const pendingBookingStr = localStorage.getItem('PendingBooking');
    if (pendingBookingStr) {
      const data = JSON.parse(pendingBookingStr);
      setMockSeats(data.selectedSeats);
      setMockShowtime(data.showTime);
      setMovieName(data.movieName);
      setMovieTime(data.movieTime);
    }
    else
      {
        setError("Không tìm thấy thông tin booking");
      }
    setLoading(false); 
   
  }, []);

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
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        <div className="text-center">
          <Film className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-red-400 text-lg">{error || 'Không tìm thấy thông tin booking'}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">

        <button className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ChevronLeft size={20} />
          Quay lại chọn ghế
        </button>

        <h1 className="text-3xl font-bold mb-8">
          Xác nhận thanh toán
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Ticket className="text-[#F84565]" />
                Thông tin đặt vé
              </h2>

              <h3 className="text-lg font-bold mb-3">
                {movieName}
              </h3>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
                <div className="flex gap-2">
                  <MapPin size={16} />
                </div>
                <div className="flex gap-2">
                  <Calendar size={16} />
               {mockShowtime ? (
                <>
                  {formatDate(mockShowtime.startTime)} : {formatTime(mockShowtime.startTime)}
                </>
              ) : (
                <span>--/-- : --:--</span>
              )}
                </div>

                <div className="flex gap-2">
                  <Clock size={16} />
                  {movieTime} Phút
                </div>
              </div>

              <div className="border-t border-gray-700 mt-4 pt-4">
                <h4 className="font-semibold mb-2">Ghế đã chọn</h4>
                <div className="flex gap-2 flex-wrap">
                  {mockSeats.map(seat => (
                    <span
                      key={seat.id}
                      className="px-3 py-1 bg-pink-500/20 text-[#F84565] rounded-lg text-sm"
                    >
                      {seat.rowName}{seat.seatNumber}
                      {seat.seatType === "Vip" && " (VIP)"}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <FoodGrid
            orderedFoods={orderedFoods}
            updateFoodOrder={updateFoodOrder}
          />
 
            <VoucherGrid
              selectedVoucher={selectedVoucher}
              onSelectVoucher={handChangeVoucher}
            />
          </div>

          <div className="bg-gray-800 rounded-xl p-6 h-fit sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Tổng thanh toán</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Vé ({mockSeats.length})</span>
                <span>{formatVND(subtotal)}</span>
              </div>

              {foodTotal > 0 && (
                <div className="flex justify-between">
                  <span>Đồ ăn</span>
                  <span>{formatVND(foodTotal)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Giảm giá</span>
                  <span>-{formatVND(discount)}</span>
                </div>
              )}

              <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-bold">
                <span>Tổng</span>
                <span className="text-[#F84565]">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 py-3 bg-[#F84565] rounded-lg font-bold hover:bg-pink-600"
            >
              Thanh toán
            </button>
          </div>
        </div>      
      </div>
    </div>
  );
};

export default Checkout;
