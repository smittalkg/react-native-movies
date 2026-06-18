import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../api";

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetail(id),
  });
}
