import { ChevronRight, Calendar, Clock } from 'lucide-react';
import type { BookingResource } from '../../types/response/BookingRespones';
import { getStatusConfig } from '../../utils/bookingStatus';
import { formatDate, formatTime, formatVND } from '../../utils/formatters';
interface BookingCardProps {
  booking: BookingResource;
  onClick: () => void;
}

export const BookingCard= ({ booking, onClick }:BookingCardProps) =>{
   const statusConfig = getStatusConfig(booking.status);
   const StatusIcon = statusConfig.icon;
    return (
    <button
      onClick={onClick}
      className="w-full mb-3 bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors text-left "
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{booking.nameMovie}</h3>
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
          >
            <StatusIcon size={14} />
            {statusConfig.label}
          </div>
        </div>
        <ChevronRight className="text-gray-400 flex-shrink-0 ml-2" size={20} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-3">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{formatDate (booking.startTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{formatTime(booking.startTime)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <span className="text-sm text-gray-400">
          {booking.tickets.length} vé • {booking.orderedFoods.length} món ăn
        </span>
        <span className="text-lg font-bold text-[#F84565]">{formatVND(booking.total)}</span>
      </div>
    </button>
  );
}