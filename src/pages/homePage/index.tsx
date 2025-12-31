import { Film } from "lucide-react";
import { fetchALLMovie } from "../../services/movieService";
import type { Movie } from "../../types/Movie";
import { HeroBanner } from "./HeroBanner";
import { NowShowing } from "./NowShowing";
import { Trailers } from "./Trailers";
import { useEffect, useState } from 'react';
 const HomePage = () => {
  const [movies,setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
     const loadHome = async () => {
       try {
         setLoading(true);
         setError(null);
         const data = await fetchALLMovie();
         setMovies(data);
       } catch (err: any) {
         setError(err.message || 'Không tải được thông tin phim');
       } finally {
         setLoading(false);
       }
     };
     loadHome();
   }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#F84565] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        <div className="text-center">
          <Film className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-red-400 text-lg">{error || 'Không tìm thấy phim'}</p>
        </div>
      </div>
    );
  }
  return (
    <main className="bg-black">
      <HeroBanner />
      <NowShowing movies={movies} />
      <Trailers />
    </main>
  );
};

export default HomePage;
