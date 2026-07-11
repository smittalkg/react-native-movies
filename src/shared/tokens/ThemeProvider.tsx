import { createContext, useContext, type PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, type Theme } from "./index";

const ThemeContext = createContext<Theme>(lightTheme);
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: PropsWithChildren) {
  const scheme = useColorScheme(); // 'light' | 'dark' | null
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
