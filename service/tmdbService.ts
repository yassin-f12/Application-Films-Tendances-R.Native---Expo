import tmdbConfig from "@/config/tmdb.config";

export async function getMovies() {
    try {
        const url = `${tmdbConfig.baseUrl}/trending/movie/week?api_key=${tmdbConfig.apiKey}`;
        const response = await fetch(url)
        const data = await response.json()
        return data.results
    } catch (e) {
        console.log("erreur TMDB : ", e);
        return [];
    }
}

export async function getGenres() {
    try {
        const url = `${tmdbConfig.baseUrl}/genre/movie/list?api_key=${tmdbConfig.apiKey}&language=fr-FR`;
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    } catch (e) {
        console.log("erreur genres : ", e);
        return [];
    }
}