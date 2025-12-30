import { useState, useEffect } from 'react';
import { fetchAllBooking } from '../../services/booking';
import type { BookingResource, BookingStatus } from '../../types/response/BookingRespones';

export const useBookingHistory = () =>{
  const [bookings, setBookings] = useState<BookingResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | BookingStatus>('ALL');
  
   useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAllBooking()
        setBookings(response);
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings =
    filter === "ALL"
        ? bookings
        : bookings.filter(b => b.status === filter)

  return {
    bookings: filteredBookings,
    loading,
    error,
    filter,
    setFilter
  };
}