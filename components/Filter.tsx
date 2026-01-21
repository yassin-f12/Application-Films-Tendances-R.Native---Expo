import { Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useMovieStore } from "@/store/movieStore";
import { useState } from "react";


export default function Filter() {
  const genres = useMovieStore((state) => state.genres);
  const filterByGenre = useMovieStore((state) => state.filterByGenre);
  const [activeGenre, setActiveGenre] = useState<number | null>(null);

  const handlePress = (id: number | null) => {
    setActiveGenre(id);
    filterByGenre(id);
  };

  return (
    <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.container}
    >
        <Pressable
            style={[
                styles.button, 
                activeGenre === null && styles.activeButton
            ]}
            onPress={() => handlePress(null)}
        >
            <Text 
                style={[
                    styles.text, 
                    activeGenre === null && styles.activeText
                ]}
            >Tout
            </Text>
        </Pressable>

      {genres.map((genre) => (
        <Pressable
            key={genre.id}
            style={[
                styles.button, 
                activeGenre === genre.id && styles.activeButton
            ]}
            onPress={() => handlePress(genre.id)}
        >
          <Text 
            style={[
                styles.text, 
                activeGenre === genre.id && styles.activeText
            ]}>
                {genre.name}
            </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 0,
  },
  button: {
    backgroundColor: "#444",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: "#000",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
});
