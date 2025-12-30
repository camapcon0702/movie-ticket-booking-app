import { Printer, UtensilsCrossed, X } from "lucide-react";
import type { BookingResource } from "../../types/response/BookingRespones";
import { getStatusConfig } from "../../utils/bookingStatus";
import { formatDate, formatTime, formatVND } from "../../utils/formatters";
import { exportTicketPDF } from "../../hooks/history/useTicketExport";

interface BookingDetailModalProps {
  booking: BookingResource;
  onClose: () => void;
}

export const BookingDetailModal = ({ booking, onClose }: BookingDetailModalProps) => {
  const statusConfig = getStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 sm:px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg sm:max-w-md rounded-3xl bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-2xl font-bold text-gray-900">Chi tiết đặt vé</h2>
          <div className="flex items-center gap-3">
            {booking.status === "SUCCESS" && (
              <button
                onClick={() => exportTicketPDF(booking)}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F84565] to-[#e03e55] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <Printer size={18} className="group-hover:rotate-12 transition-transform" />
                Xuất vé PDF
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Đóng"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="px-6 py-7 space-y-8 bg-gradient-to-b from-white to-gray-50/50">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
              {booking.nameMovie}
            </h3>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${statusConfig.bg} ${statusConfig.color} shadow-sm`}
              >
                <StatusIcon size={16} />
                {statusConfig.label}
              </span>
              <span className="text-sm text-gray-500">
                Mã booking: <strong className="text-[#F84565]">#{booking.id}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Ngày", value: formatDate(booking.startTime), icon: "📅" },
              { label: "Giờ chiếu", value: formatTime(booking.startTime), icon: "🕐" },
              {
                label: "Phòng",
                value: booking.tickets[0]?.auditoriumName || "—",
                icon: "🎬",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white border border-gray-100 px-4 py-4 text-center shadow-sm hover:shadow transition-shadow"
              >
                <div className="text-sm text-gray-500 mb-1.5">{item.icon}</div>
                <div className="text-base font-semibold text-gray-800">{item.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-xl">💺</span> Ghế đã chọn
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
              {booking.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-xl bg-[#F84565]/10 border border-[#F84565]/30 px-3 py-2.5 text-center text-sm font-semibold text-[#F84565] shadow-sm"
                >
                  {ticket.seatName}
                </div>
              ))}
            </div>
          </div>

          {booking.orderedFoods?.length > 0 && (
            <div>
              <h4 className="text-lg font-bold flex items-center gap-2 mb-4 text-gray-800">
                <UtensilsCrossed size={20} className="text-[#F84565]" />
                Đồ ăn & Thức uống
              </h4>

              <div className="space-y-3">
                {booking.orderedFoods.map((food) => (
                  <div
                    key={food.foodId}
                    className="flex items-center justify-between rounded-2xl bg-white border border-gray-100 px-5 py-4 shadow-sm"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{food.foodName}</div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        Số lượng: {food.quantity}
                      </div>
                    </div>
                    <div className="text-base font-bold text-[#F84565]">
                      x{food.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-6 bg-gradient-to-r from-[#F84565]/5 to-[#F84565]/10 border-t border-[#F84565]/20">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Tổng thanh toán</span>
            <span className="text-3xl font-extrabold text-[#F84565] tracking-tight">
              {formatVND(booking.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};