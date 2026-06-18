import { z } from "zod";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  overview: z.string(),
  release_date: z.string(),
  vote_average: z.number(),
  popularity: z.number(),
});

export const movieSearchResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const movieDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  overview: z.string(),
  release_date: z.string(),
  vote_average: z.number(),
  popularity: z.number(),
  runtime: z.number().nullable(),
  tagline: z.string(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
});
