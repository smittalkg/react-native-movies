import { darkColors, lightColors } from "./colors";
import { typography } from "./typography";

export const lightTheme = { colors: lightColors, typography };
export const darkTheme = { colors: darkColors, typography };
export type Theme = typeof lightTheme;
