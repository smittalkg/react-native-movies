import { integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey(), // reuse TMDB's movie id
  title: text("title").notNull(),
  posterPath: text("poster_path"), // nullable — mirrors the API
  releaseDate: text("release_date"),
  voteAverage: real("vote_average"),
  addedAt: integer("added_at", { mode: "timestamp" }).notNull(),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const movieTags = sqliteTable(
  "movie_tags",
  {
    movieId: integer("movie_id")
      .notNull()
      .references(() => movies.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => [primaryKey({ columns: [t.movieId, t.tagId] })],
);
