import { useAppSelector } from "@/shared/store/hooks";
import { radius } from "@/shared/tokens/radius";
import { spacing } from "@/shared/tokens/spacing";
import { useTheme } from "@/shared/tokens/ThemeProvider";
import AppText from "@/shared/ui/app-text";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useMovieSearch } from "../hooks/useMovieSearch";
import type { Movie } from "../types";
import FilterBar from "./FilterBar";
import MovieRow from "./MovieRow";

const keyExtractor = (movie: Movie) => String(movie.id);

export default function MovieSearchScreen() {
  const [text, setText] = useState("");
  const { data, isLoading, isError } = useMovieSearch(text);
  const { colors } = useTheme();

  const { minimumRating, sortBy } = useAppSelector((s) => s.filters);

  const visibleData = useMemo(() => {
    if (!data) return [];
    const filtered =
      minimumRating == null ? data : data.filter((d) => d.vote_average >= minimumRating);
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "rating":
          return b.vote_average - a.vote_average;
        case "release_date":
          return b.release_date.localeCompare(a.release_date);
      }
    });
  }, [data, minimumRating, sortBy]);

  const renderItem = useCallback(({ item }: { item: Movie }) => <MovieRow item={item} />, []);

  return (
    <View style={[sheet.container, { backgroundColor: colors.white }]}>
      <TextInput
        style={[
          sheet.textInput,
          {
            borderColor: colors.lightGrey,
            color: colors.black,
            backgroundColor: colors.ultraLightGrey,
          },
        ]}
        value={text}
        placeholder="Search Movie"
        placeholderTextColor={colors.mediumgrey}
        onChangeText={setText}
      />
      <FilterBar />

      {isLoading && <LoadingSpinner />}

      {isError && <AppText>Something went wrong</AppText>}

      {visibleData.length > 0 && (
        <FlatList data={visibleData} keyExtractor={keyExtractor} renderItem={renderItem} />
      )}

      {data && visibleData.length === 0 && <AppText>No results</AppText>}
    </View>
  );
}

const sheet = StyleSheet.create({
  container: { flex: 1, padding: spacing.medium_sm, gap: spacing.sm },
  textInput: {
    borderWidth: 1,
    height: 40,
    padding: spacing.x_sm,
    borderRadius: radius.lg,
  },
});
