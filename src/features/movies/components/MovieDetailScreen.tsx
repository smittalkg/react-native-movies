import { spacing } from "@/shared/tokens/spacing";
import { useTheme } from "@/shared/tokens/ThemeProvider";
import AppImage from "@/shared/ui/app-image";
import AppText from "@/shared/ui/app-text";
import { images } from "@/shared/ui/images";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { ScrollView, StyleSheet, View } from "react-native";
import { useMovieDetail } from "../hooks/useMovieDetail";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieDetailScreen({ id }: { id: number }) {
  const { data, isLoading, isError } = useMovieDetail(id);
  const { colors } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      {isLoading && <LoadingSpinner />}

      {isError && <AppText>Something went wrong...</AppText>}

      {data && (
        <View style={style.contentView}>
          <AppText variant="heading1">{data.title}</AppText>
          <AppText variant="body3" color="darkGrey">
            {data.tagline}
          </AppText>
          {data.runtime && (
            <AppText variant="body3" color="darkGrey">
              {data.runtime} min
            </AppText>
          )}
          {data.genres.map((genre) => (
            <AppText key={genre.id} color="primaryPurple">
              {genre.name}
            </AppText>
          ))}
          <AppText>{data.overview}</AppText>
          <AppImage
            source={
              data.poster_path ? `${POSTER_BASE}${data.poster_path}` : images.placeholderPoster
            }
            style={style.image}
          />
        </View>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  contentView: { padding: spacing.medium_sm, gap: spacing.x_sm },
  image: { width: 200, height: 200 },
});
