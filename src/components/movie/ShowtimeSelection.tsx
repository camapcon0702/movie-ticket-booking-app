import { useEffect, useState } from "react";
import { Calendar, Clock, ChevronRight, Ticket } from "lucide-react";
import { fetchShowtimeByMovieId } from "../../services/showtime";
import type { Showtime } from "../../types/Showtime";
import useShowtimesByDate from "../../hooks/showtime/useShowtimesByDate";
import { useNavigate } from 'react-router-dom';
interface ShowtimeSelectionProps {
  movieId: number;
  movieName:string;
  movieTime:number
}
const ShowtimeSelection = ({ movieId,movieName,movieTime}: ShowtimeSelectionProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showtimeSelect, setShowtimeSelect] = useState<Showtime>();
  const navigate = useNavigate(); 
  const handSelectShowtime =(st:Showtime) =>
  {
    setShowtimeSelect(st);
  }
  const goToBooking =()=>{
     if (!showtimeSelect) return;
      localStorage.setItem('Booking', JSON.stringify({ movieName:movieName, showTime:showtimeSelect, movieTime:movieTime})
    );
      navigate(`/booking/${showtimeSelect.id}`);
  }
  useEffect(() => {
    if (!movieId) {
      setError("Không tìm thấy ID phim");
      setLoading(false);
      return;
    }

    const loadShowtimes = async () => {
      try {
        setLoading(true);
        const res = await fetchShowtimeByMovieId(movieId);
        setShowtimes(res || []);
      } catch (err: any) {
        setError(err.message || "Không tải được suất chiếu");
      } finally {
        setLoading(false);
      }
    };

    loadShowtimes();
  }, [movieId]);

  const {
    dateGroups,
    selectedDateKey,
    selectDate,
    selectedShowtimes,
    hasData,
  } = useShowtimesByDate(showtimes);

  if (loading) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-14 h-14 border-4 bg-[#F84565] hover:bg-[#e63a58] rounded-full animate-spin" />
          <Ticket className="absolute inset-0 m-auto w-7 h-7 text-[#F84565] animate-pulse" />
        </div>
        <p className="mt-4 text-gray-300">Đang tải suất chiếu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <Calendar className="w-10 h-10 text-red-400 mx-auto mb-2" />
          <p className="text-red-400 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-400">
        Không có suất chiếu
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#2B0F14] via-[#1F0C10] to-[#0F0709] shadow-lg shadow-pink-900/30">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Calendar size={22} className="text-[#F84565]" />
          Chọn ngày chiếu
        </h4>

        <div className="flex gap-3 overflow-x-auto pb-3">
          {dateGroups.map((group) => {
            const isSelected = selectedDateKey === group.dateKey;
            const [day, month] = group.display.split("/");

            return (
              <button
                key={group.dateKey}
                onClick={() => {
                  selectDate(group.dateKey);
                  setSelectedTime("");
                }}
                className={`flex-shrink-0 min-w-[80px] px-4 py-3 rounded-xl text-center transition-all ${
                  isSelected
                    ? "bg-gradient-to-br bg-[#F84565] hover:bg-[#e63a58] "
                    : "bg-[#1e0f15] border border-[#F84565] hover:border-pink-500/60"
                }`}
              >
                <div className={`text-2xl font-bold ${isSelected ? "text-white" : "text-pink-100"}`}>
                  {day}
                </div>
                <div className={`text-xs ${isSelected ? "text-pink-100" : "text-pink-300/70"}`}>
                  Th {month}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDateKey && (
        <>
          {selectedShowtimes.length > 0 ? (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-200">
                <Clock size={22} className="text-[#F84565]" />
                Chọn giờ chiếu
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {selectedShowtimes.map((st) => {
                  const time = new Date(st.startTime).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const isSelected = selectedTime === st.startTime;
                  return (
                    <button
                     key={st.id}
                      onClick={() => {
                        setSelectedTime(st.startTime);
                        handSelectShowtime(st);
                      }}
                      className={`px-3 py-2 rounded-lg text-center transition-all ${
                        isSelected
                          ? "bg-gradient-to-br bg-[#F84565] hover:bg-[#e63a58] text-white shadow-md shadow-pink-500/40 scale-105"
                          : "bg-gray-800/40 text-gray-200 border border-[#F84565] hover:border-pink-900"
                      }`}
                    >
                      <div className="text-sm font-semibold">{time}</div>
                      <div className="text-[11px] text-gray-400">
                        {st.basePrice.toLocaleString("vi-VN")} ₫
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedTime && (
                <button onClick={()=>{goToBooking()}} className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 font-bold shadow-lg shadow-pink-600/40 hover:scale-[1.02] transition">
                  Book Now
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">
              Không có suất chiếu cho ngày này
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowtimeSelection;
