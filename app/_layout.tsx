import { bootstrapAuth } from "@/features/auth/authThunks";
import { queryClient } from "@/shared/api/queryClient";
import { store } from "@/shared/store";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { ThemeProvider } from "@/shared/tokens/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

function Gate() {
  const [loaded, fontError] = useFonts({
    Light: require("../assets/fonts/Roboto-Light.ttf"),
    Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    Bold: require("../assets/fonts/Roboto-Bold.ttf"),
  });
  const status = useAppSelector((s) => s.auth.status);
  const dispatch = useAppDispatch();

  const ready = (loaded || fontError) && status !== "bootstrapping";

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  const isAuthenticated = status === "authenticated";

  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="movie/[id]" options={{ presentation: "modal" }} />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <Gate />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
