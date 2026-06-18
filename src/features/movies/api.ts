import { tmdbClient } from "@/shared/api/client";
import { movieDetailSchema, movieSearchResponseSchema } from "./schema";
import type { Movie, MovieDetail } from "./types";

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await tmdbClient.get("/search/movie", { params: { query } });
  const parsed = movieSearchResponseSchema.parse(res.data);
  return parsed.results;
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  const res = await tmdbClient.get(`/movie/${id}`);
  return movieDetailSchema.parse(res.data);
}
