const token = process.env.EXPO_PUBLIC_TMDB_READ_TOKEN;
if (!token) {
  throw new Error("Missing EXPO_PUBLIC_TMDB_READ_TOKEN — copy .env.example to .env");
}
export const env = { tmdbReadToken: token } as const;
