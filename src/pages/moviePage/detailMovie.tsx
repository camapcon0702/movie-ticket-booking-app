import { useEffect, useState } from 'react';
import { Heart, Play, Star, Calendar, Clock, Film, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import type { Movie } from '../../types/Movie';
import { fetchMovieById } from '../../services/movieService';
import ShowtimeSelection from '../../components/movie/ShowtimeSelection';

export default function DetailMovie() {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? Number(id) : null;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setError('Không tìm thấy ID phim');
      setLoading(false);
      return;
    }
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (err: any) {
        setError(err.message || 'Không tải được thông tin phim');
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [movieId]);

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

  if (error || !movie) {
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

  const mockCast = [
    { name: 'Chris Pratt', role: 'Star-Lord', image: 'https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg' },
    { name: 'Zoe Saldana', role: 'Gamora', image: 'https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg' },
    { name: 'Dave Bautista', role: 'Drax', image: 'https://https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg' },
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative bg-gradient-to-b from-gray-900/80 to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${movie.posterUrl})` }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 sm:py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full sm:w-64 lg:w-80 mx-auto lg:mx-0 shrink-0">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {movie.title}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                  <span className="text-lg font-semibold">{movie.starNumber}/10 IMDb</span>
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed">
                {movie.description}
              </p>

              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F84565]" />
                  <span>Release date: {movie.releaseDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#F84565]" />
                  <span>Duration: {movie.durationMinutes} minutes</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-white/10 rounded-full text-sm border border-white/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#F84565] hover:bg-pink-700 rounded-lg font-semibold transition-colors"
                >
                  <Play size={20} className="fill-white" />
                  Watch Trailer
                </a>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-[#F84565] hover:bg-pink-700'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                  aria-label={isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart
                    className={`${isLiked ? 'fill-white text-white' : 'text-white'}`}
                    size={20}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="text-[#F84565]" />
          Your Favorite Cast
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {mockCast.map((actor, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-800 mb-2 overflow-hidden border-2 border-gray-700">
                <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.role}</p>
            </div>
          ))}
        </div>
      </div>
    {movieId !== null && (
      <div className="min-h-screen flex justify-center items-start">
        <div className="w-full max-w-5xl px-4">
          <ShowtimeSelection movieId={movieId} movieName={movie.title} movieTime={movie.durationMinutes} />
        </div>
      </div>
    )}
    </div>
  );
}