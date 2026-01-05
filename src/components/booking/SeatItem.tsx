import type { SeatStatus } from "../../types/Seat";

interface Props {
  status: SeatStatus;
  onClick: () => void;
}

const getSeatStyle = (status: SeatStatus): string => {
const baseStyle =
  'w-8 h-8 rounded-lg border-2 transition-colors duration-150 focus:outline-none focus:ring-0';

  
    switch (status) {
      case 'selected':
        return `${baseStyle} bg-[#F84565] border-pink-400 ring-2 ring-pink-400`;
      case 'booked':
        return `${baseStyle} cursor-not-allowed`;
      case "vip":
        return `${baseStyle} bg-yellow-400 border-yellow-300 ring-1 ring-yellow-400/60`;
      default:
        return `${baseStyle} bg-gray-700/60 border-gray-600 hover:bg-gray-600/60`;
    }
};

export const SeatItem = ({ status, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={status === 'booked'}
      className={getSeatStyle(status)}
      style={status === 'booked' ? { 
        backgroundColor: 'rgba(131, 24, 67, 0.6)',
        borderColor: 'rgba(159, 18, 57, 0.8)'
      } : undefined}
    />
  );
};