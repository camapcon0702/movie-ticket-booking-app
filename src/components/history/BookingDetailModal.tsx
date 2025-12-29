import { Printer, UtensilsCrossed, X } from "lucide-react";
import type { BookingResource } from "../../types/response/BookingRespones";
import { getStatusConfig } from "../../utils/bookingStatus";
import { formatDate, formatTime, formatVND } from "../../utils/formatters";

interface BookingDetailModalProps {
  booking: BookingResource;
  onClose: () => void;
}

export const BookingDetailModal = ({
  booking,
  onClose,
}: BookingDetailModalProps) => {
  const statusConfig = getStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">Vé xem phim</h2>
          <div className="flex items-center gap-2">
          {booking.status =="SUCCESS" && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm">
                  <Printer size={16} />
                  Xuất vé
            </button>)
              }
             <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">

            <div className="p-4">
              <h3 className="text-lg font-bold text-white">
                {booking.nameMovie}
              </h3>

              <div
                className={`inline-flex items-center gap-1 px-2 py-0.5 mt-2 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}
              >
                <StatusIcon size={12} />
                {statusConfig.label}
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-400">Mã booking</span>
                <span className="font-bold text-[#F84565]">
                  #{booking.id}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-600 mx-4" />

            <div className="grid grid-cols-3 gap-4 p-4 text-sm">
              <div>
                <div className="text-gray-400 text-xs">📅 Ngày</div>
                <div className="text-white font-semibold">
                  {formatDate(booking.startTime)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">🕐 Giờ</div>
                <div className="text-white font-semibold">
                  {formatTime(booking.startTime)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">🎭 Phòng</div>
                <div className="text-white font-semibold">
                  {booking.tickets[0]?.auditoriumName || "N/A"}
                </div>
              </div>
            </div>

            <div className="px-4 pb-5">
              <div className="text-gray-400 text-xs mb-2">💺 Ghế</div>
              <div className="flex flex-wrap gap-2">
                {booking.tickets.map((ticket) => (
                  <span
                    key={ticket.id}
                    className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm font-semibold text-white"
                  >
                    {ticket.seatName}
                  </span>

                ))}
              </div>
            </div>
            <div className="border-t border-dashed border-gray-600 mx-4" />
            {booking.orderedFoods.length > 0 && (
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <UtensilsCrossed size={22} className="text-[#F84565]" />
                  <h4 className="text-white font-bold text-base">
                    Đồ ăn & Thức uống
                  </h4>
                </div>

                <div className="space-y-3">
                  {booking.orderedFoods.map((food) => (
                    <div
                      key={food.foodId}
                      className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3"
                    >
                      <div>
                        <div className="text-white font-semibold text-sm">
                          {food.foodName}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                          Số lượng: {food.quantity}
                        </div>
                      </div>

                      <div className="text-[#F84565] font-bold text-base">
                        x{food.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-pink-500/10 border-t border-[#F84565] p-4 flex justify-between items-center">
              <span className="text-white font-bold text-base">
                Tổng thanh toán
              </span>
              <span className="text-xl font-extrabold text-[#F84565]">
                {formatVND(booking.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
