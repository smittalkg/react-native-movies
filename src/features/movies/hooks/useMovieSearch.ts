import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api";

export function useMovieSearch(query: string) {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
  });
}
