import { Text, type TextProps } from "react-native";
import { typography, type TextVariant } from "./typography";

type AppTextProps = TextProps & { variant?: TextVariant };

export default function AppText({ variant = "body", style, ...rest }: AppTextProps) {
  return <Text style={[typography[variant], style]} {...rest} />;
}
