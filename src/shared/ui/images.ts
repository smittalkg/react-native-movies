import type { ImageSourcePropType } from "react-native";

export const images = {
  placeholderPoster: require("@assets/images/placeholder-poster.png"),
} satisfies Record<string, ImageSourcePropType>;

export type ImageKey = keyof typeof images;
