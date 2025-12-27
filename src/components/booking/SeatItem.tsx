import type { SeatStatus } from "../../types/Seat";

interface Props {
  status: SeatStatus;
  onClick: () => void;
}

const getSeatStyle = (status: SeatStatus): string => {
  const baseStyle = 'w-8 h-8 rounded-lg border-2 transition-all duration-200';
  
    switch (status) {
      case 'selected':
        return `${baseStyle} bg-pink-500 border-pink-400 scale-110 shadow-lg shadow-pink-500/30`;
      case 'booked':
        return `${baseStyle} cursor-not-allowed`;
       case "vip":
      return `${baseStyle} bg-yellow-400  border-yellow-300  hover:bg-yellow-300  shadow-lg  shadow-yellow-400/40`;
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