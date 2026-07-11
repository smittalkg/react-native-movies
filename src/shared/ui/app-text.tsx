import { Text, type TextProps } from "react-native";
import { lightColors } from "@/shared/tokens/colors";
import { useTheme } from "@/shared/tokens/ThemeProvider";
import { typography } from "@/shared/tokens/typography";

type Variant = keyof typeof typography;
type ColorToken = keyof typeof lightColors;

type AppTextProps = TextProps & {
  variant?: Variant;
  /** Theme color token; defaults to the primary foreground color. */
  color?: ColorToken;
};

export default function AppText({
  variant = "body2",
  color = "black",
  style,
  ...rest
}: AppTextProps) {
  const theme = useTheme();
  return (
    <Text style={[theme.typography[variant], { color: theme.colors[color] }, style]} {...rest} />
  );
}
