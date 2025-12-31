import { useState } from "react";
import type { Movie } from "../../types/Movie";
import { MovieItem } from "./MovieItem";

interface MovieGridProps{
    movies: Movie[]
    pageSize?: number
   
}

export const MovieGrid = ({
  movies,
  pageSize = 8,
}: MovieGridProps) => {
  const [page, setPage] = useState(1); 
  const totalPages = Math.ceil(movies.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentMovies = movies.slice(start, start + pageSize);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="rounded-full px-4 py-2 text-sm font-semibold
                       bg-gray-800 text-white disabled:opacity-40"
          >
            Trước
          </button>

          <span className="text-sm text-gray-400">
            Trang {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="rounded-full px-4 py-2 text-sm font-semibold
                       bg-gray-800 text-white disabled:opacity-40"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}