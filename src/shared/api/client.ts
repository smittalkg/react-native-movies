import { logout } from "@/features/auth/authThunks";
import { env } from "@/shared/config/env";
import { store } from "@/shared/store";
import { create, isAxiosError } from "axios";

export const tmdbClient = create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
  },
});

tmdbClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${env.tmdbReadToken}`;
  return config;
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);
