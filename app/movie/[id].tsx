import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useMovieStore } from "@/store/movieStore";
import { Image } from 'expo-image';
import tmdbConfig from "@/config/tmdb.config";
import { useEffect } from "react";

export default function MovieDetail() {
    const { id } = useLocalSearchParams();
    const movies = useMovieStore((state) => state.movies)
    const selectedMovie = useMovieStore((state) => state.selectedMovie)
    const navigation = useNavigation();

    const movie = selectedMovie || movies.find((m) => m.id === Number(id))

    useEffect(() => {
      if (movie) {
        navigation.setOptions({ title: movie.title })
      }
    }, [movie]);

    if (!movie) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'white' }}>Film non trouvé</Text>
            </View>
        )
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Image
              source={{ uri: tmdbConfig.imageBaseUrl + movie.poster_path }}
              style={styles.image}
          />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview || "Pas de description"}</Text>
          <Text style={styles.label}>Date de sortie :</Text>
          <Text style={styles.info}>{movie.release_date || "Inconnue"}</Text>
          <Text style={styles.label}>Note moyenne :</Text>
          <Text style={styles.info}>{movie.vote_average || "N/A"} ⭐</Text>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    color: "#aaaaaa",
    fontSize: 14,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
  },
  overview: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify",
  },
  info: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
});