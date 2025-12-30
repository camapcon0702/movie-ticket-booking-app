import { CheckCircle, XCircle, AlertCircle, CreditCard } from 'lucide-react';
import type { BookingStatus } from '../types/response/BookingRespones';

export interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  icon: any;
}

export const getStatusConfig = (status: BookingStatus): StatusConfig => {
  const configs: Record<BookingStatus, StatusConfig> = {
    PENDING: {
      label: 'Chờ xử lý',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20',
      icon: AlertCircle
    },
    CONFIRMED: {
      label: 'Đã xác nhận',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      icon: CheckCircle
    },
    SUCCESS: {
      label: 'Đã thanh toán',
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      icon: CreditCard
    },
    CANCELLED: {
      label: 'Đã hủy',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      icon: XCircle
    }
  };
  return configs[status];
};