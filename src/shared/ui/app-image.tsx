import { Image, type ImageProps } from "expo-image";

const BLURHASH = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

export default function AppImage(props: ImageProps) {
  return (
    <Image contentFit="cover" transition={200} placeholder={{ blurhash: BLURHASH }} {...props} />
  );
}
