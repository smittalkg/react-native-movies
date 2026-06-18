import { z } from "zod";
import { movieSchema, movieSearchResponseSchema } from "./schema";

export type Movie = z.infer<typeof movieSchema>;
export type MovieSearchResponse = z.infer<typeof movieSearchResponseSchema>;
