import { getMovies } from "@/service/tmdbService";
import { getGenres } from "@/service/tmdbService";
import { create } from "zustand";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];
}

interface Genre {
  id: number;
  name: string;
}

interface MovieState {
    movies: Movie[];
    selectedMovie: Movie | null;
    loadTrendingMovies: () => Promise<void>;
    selectMovie: (id: number) => void;
    filteredMovies: Movie[];
    genres: Genre[];
    filterByGenre: (genreId: number | null) => void;
    loadGenres: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
    movies: [],
    selectedMovie: null,
    filteredMovies: [],

    genres: [],


    loadTrendingMovies: async () => {
        const movies = await getMovies();
        set({ movies, filteredMovies: movies });
    },

    loadGenres: async () => {
        const genres = await getGenres()
        set({ genres })
    },

    selectMovie: (id: number) => {
        set((state) => ({
            selectedMovie: state.movies.find((m) => m.id === id) || null
        }))
    },

    filterByGenre: (genreId) => {
        set((state) => ({
        filteredMovies:
            genreId === null
            ? state.movies
            : state.movies.filter((m) =>
                m.genre_ids?.includes(genreId)
            ),
        }));
    },
}))