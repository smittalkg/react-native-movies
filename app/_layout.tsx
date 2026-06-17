import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    SemiBold: require("../assets/fonts/Roboto-SemiBold.ttf"),
    Bold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded && !error) return null;
  return <Stack />;
}
