import { tmdbClient } from "@/shared/api/client";
import { Movie, MovieSearchResponse } from "./types";

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await tmdbClient.get<MovieSearchResponse>("/search/movie", { params: { query } });
  return res.data.results;
}
