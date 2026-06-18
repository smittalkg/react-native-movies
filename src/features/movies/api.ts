import { tmdbClient } from "@/shared/api/client";
import { movieSearchResponseSchema } from "./schema";
import { Movie } from "./types";

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await tmdbClient.get("/search/movie", { params: { query } });
  const parsed = movieSearchResponseSchema.parse(res.data);
  return parsed.results;
}
