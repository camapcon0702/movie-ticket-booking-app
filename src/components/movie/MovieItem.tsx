import { Star } from "lucide-react";
import type { Movie } from "../../types/Movie";
import { useNavigate } from "react-router-dom";
interface MovieItemProps {
  movie: Movie;
}

export const MovieItem = ({ movie }: MovieItemProps) => {
  const navigate = useNavigate();
  const onBook = () =>{
    navigate(`/movie/${movie.id}`)
  }
    return (
    <div className="group rounded-2xl bg-[#0f0f0f] shadow-lg overflow-hidden hover:-translate-y-1 transition">
      <div className="relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-[260px] w-full object-cover"
        />

        <div className="absolute top-3 right-3 flex items-center gap-1 
                        rounded-full bg-black/70 px-2 py-1 text-sm text-yellow-400">
          <Star size={14} fill="currentColor" />
          {movie.starNumber}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-bold text-white line-clamp-2">
          {movie.title}
        </h3>

        <p className="text-sm text-gray-400">
          {movie.genres?.join(", ")} • {movie.durationMinutes} phút
        </p>

        <button
          onClick={() => onBook()}
          className="mt-3 w-full rounded-full 
                     bg-[#F84565] py-2 text-sm font-semibold text-white
                     hover:opacity-90"
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
}