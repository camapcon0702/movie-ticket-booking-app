export interface Movie {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  releaseDate: string;
  posterUrl: string;
  trailerUrl: string;
  status: 'COMING_SOON' | 'NOW_SHOWING' | 'ARCHIVED';
  starNumber: number;
  genres: string[];
}


// export type MovieDetailResponse = ApiResponse<Movie>;