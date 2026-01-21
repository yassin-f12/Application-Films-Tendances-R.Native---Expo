import { View, FlatList, Text, Pressable, Platform, StyleSheet } from "react-native";
import { useMovieStore } from "@/store/movieStore";
import { useEffect } from "react";
import { Image } from 'expo-image';
import tmdbConfig from "@/config/tmdb.config";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import Filter from "@/components/Filter";

export default function Index() {
  const loadTrendingMovies = useMovieStore((state) => state.loadTrendingMovies)
  const selectMovie = useMovieStore((state) => state.selectMovie)
  const router = useRouter()
  const navigation = useNavigation();

  const movies = useMovieStore((state) => state.filteredMovies);
  const loadGenres = useMovieStore((state) => state.loadGenres);

  useEffect(() => {
    loadTrendingMovies()
    loadGenres()
    navigation.setOptions({ title: "Films Tendance" });
  }, [])

  return (
    <>
    <Filter />
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listMovie}
      renderItem={({ item }) => (
        <Pressable
          style={styles.movieItem}
          onPress={() => {
            selectMovie(item.id)
            router.push({
              pathname: '/movie/[id]',
              params: { id: item.id.toString() },
            });
          }}
        >
          <Image 
            source={{ uri: tmdbConfig.imageBaseUrl + item.poster_path}} 
            style={styles.image} 
          />
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      )}
    />
    </>
  );
}

const styles = StyleSheet.create({
  listMovie: {
   padding: 10,
   backgroundColor: "#1e1e1e",
  },

  movieItem: {
    width: "100%", 
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#2a2a2a", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 200,
  },

  title: {
    color: "white",
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  }
})
