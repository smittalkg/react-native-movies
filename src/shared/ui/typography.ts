import { type TextStyle } from "react-native";

export type TextVariant = "title" | "heading" | "body" | "caption";

export const typography: Record<TextVariant, TextStyle> = {
  title: { fontFamily: "Bold", fontSize: 28, lineHeight: 34 },
  heading: { fontFamily: "SemiBold", fontSize: 20, lineHeight: 26 },
  body: { fontFamily: "Regular", fontSize: 16, lineHeight: 22 },
  caption: { fontFamily: "Regular", fontSize: 13, lineHeight: 18 },
};
