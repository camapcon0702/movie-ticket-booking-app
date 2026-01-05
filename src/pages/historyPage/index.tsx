import { useState } from 'react';
import { Film } from 'lucide-react';
import type { BookingResource } from '../../types/response/BookingRespones';
import { BookingDetailModal } from '../../components/history/BookingDetailModal';
import { BookingCard } from '../../components/history/BookingCard';
import { getStatusConfig } from '../../utils/bookingStatus';
import { useBookingHistory } from '../../hooks/history/useBookingHistory';

const BookingHistory = () => {
  const {
    bookings,
    loading,
    error,
    filter,
    setFilter
  } = useBookingHistory();
  const [page,setPage] = useState(0);
  const pageSize = 5;
  const [selectedBooking, setSelectedBooking] = useState<BookingResource | null>(null);
  const totalPages = Math.ceil(bookings.length / pageSize);

  const pageBooking = bookings.slice (
    page * pageSize,
    page * pageSize + pageSize
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#F84565] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Film className="text-[#F84565]" size={32} />
          Lịch sử booking
        </h1>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['ALL', 'PENDING', 'CONFIRMED', 'SUCCESS', 'CANCELLED'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? 'bg-[#F84565] text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {status === 'ALL' ? 'Tất cả' : getStatusConfig(status).label}
            </button>
          ))}
        </div>

     <div className="flex flex-col gap-4 relative z-20">
      {pageBooking.length === 0 ? (
        <p className="text-gray-400">Không có booking nào</p>
      ) : (
        pageBooking.map(b => (
          <BookingCard 
            key={b.id}
            booking={b}
            onClick={() => setSelectedBooking(b)}
          />
        ))
      )}
    </div>
      </div>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {totalPages > 1 && (
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 rounded bg-gray-800 text-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-400">
          {page + 1} / {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 rounded bg-gray-800 text-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )}

    </div>

  );
};


export default BookingHistory;