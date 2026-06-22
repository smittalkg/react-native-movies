import AppImage from "@/shared/ui/app-image";
import AppText from "@/shared/ui/app-text";
import { images } from "@/shared/ui/images";
import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import type { Movie } from "../types";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

const MovieRow = memo(function MovieRow({ item }: { item: Movie }) {
  return (
    <Link href={`/movie/${item.id}`} asChild>
      <Pressable style={sheet.container}>
        <AppImage source={item.poster_path ? `${POSTER_BASE}${item.poster_path}` : images.placeholderPoster} style={sheet.image} />
        <AppText>{item.title}</AppText>
      </Pressable>
    </Link>
  );
});

const sheet = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 12, gap: 12 },
  image: { width: 80, height: 120, borderRadius: 8 },
});

export default MovieRow;
