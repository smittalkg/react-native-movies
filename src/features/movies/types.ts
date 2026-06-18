import { z } from "zod";
import { movieDetailSchema, movieSchema, movieSearchResponseSchema } from "./schema";

export type Movie = z.infer<typeof movieSchema>;
export type MovieSearchResponse = z.infer<typeof movieSearchResponseSchema>;
export type MovieDetail = z.infer<typeof movieDetailSchema>;
