import { bootstrapAuth } from "@/features/auth/authThunks";
import { store } from "@/shared/store";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

function Gate() {
  const [loaded, error] = useFonts({
    Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    SemiBold: require("../assets/fonts/Roboto-SemiBold.ttf"),
    Bold: require("../assets/fonts/Roboto-Bold.ttf"),
  });
  const status = useAppSelector((s) => s.auth.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  useEffect(() => {
    if ((loaded || error) && status !== "bootstrapping") {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, status]);

  const ready = (loaded || error) && status !== "bootstrapping";

  if (!ready) {
    return null;
  }

  const isAuthenticated = status === "authenticated";

  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Gate />
    </Provider>
  );
}
