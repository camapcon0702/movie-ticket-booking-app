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
        const sortBookings = [...response].sort(
          (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBookings(sortBookings);
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

  const PAYMENT_TIMEOUT_MINUTES = 15;

  const canRepay = (booking : BookingResource) => {
    if (booking.status !== 'PENDING') return false;

    const createdTime = new Date(booking.createdAt).getTime()
    const now = Date.now();
    const diffMinutes = (now - createdTime) / (1000 * 60);

    return diffMinutes <= PAYMENT_TIMEOUT_MINUTES;
  }
  return {
    bookings: filteredBookings,
    loading,
    error,
    filter,
    canRepay,
    setFilter,
    
  };
}