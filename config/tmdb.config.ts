const tmdbConfig = {
    baseUrl: "https://api.themoviedb.org/3",
    apiKey: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    trendingMoviesEndpoint: "/trending/movie/week",
    imageBaseUrl: "https://image.tmdb.org/t/p/w500"
}

export default tmdbConfig;