import { MovieGrid } from "../../components/movie/MovieGrid";
import type { Movie } from "../../types/Movie";


interface Props {
  movies: Movie[];
}

export const NowShowing = ({ movies }: Props) => {
  return (
    <section className="bg-black py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-white">
            Now Showing
          </h2>
          <button className="text-sm text-[#F84565] hover:underline">
            View all →
          </button>
        </div>

        <MovieGrid movies={movies} pageSize={8} />
      </div>
    </section>
  );
};
