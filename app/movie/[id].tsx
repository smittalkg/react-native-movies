import MovieDetailScreen from "@/features/movies/components/MovieDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <MovieDetailScreen id={Number(id)} />;
}
