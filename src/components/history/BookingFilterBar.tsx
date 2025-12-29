import type { BookingStatus } from '../../types/response/BookingRespones';
import { getStatusConfig } from '../../utils/bookingStatus';

interface BookingFilterBarProps {
  filter: 'ALL' | BookingStatus;
  onFilterChange: (filter: 'ALL' | BookingStatus) => void;
}

export const BookingFilterBar = ({ filter,onFilterChange}:BookingFilterBarProps) =>{
    const filters: ('ALL' | BookingStatus)[] = [
    'ALL',
    'CONFIRMED',
    'SUCCESS',
    'PENDING',
    'CANCELLED'
  ];

  const getLabel = (status:'ALL'|BookingStatus):string => {
     if (status === 'ALL') return 'Tất cả';
     return getStatusConfig(status).label;
  }
   return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {filters.map(status => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
            filter === status
              ? 'bg-[#F84565] text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {getLabel(status)}
        </button>
      ))}
    </div>
  );
}