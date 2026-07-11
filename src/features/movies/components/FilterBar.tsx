import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { radius } from "@/shared/tokens/radius";
import { spacing } from "@/shared/tokens/spacing";
import { useTheme } from "@/shared/tokens/ThemeProvider";
import AppText from "@/shared/ui/app-text";
import { Pressable, StyleSheet, View } from "react-native";
import { setMinRating, setSort, SORT_OPTIONS } from "../filtersSlice";

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { minimumRating, sortBy } = useAppSelector((s) => s.filters);
  const ratings = [0, 5, 7, 8];

  const buttonStyle = (active: boolean) => [
    sheet.button,
    { borderColor: colors.lightGrey },
    active && { borderColor: colors.primaryPurple, backgroundColor: colors.ultraLightGrey },
  ];

  return (
    <View style={sheet.container}>
      <View style={sheet.sortOptions}>
        {SORT_OPTIONS.map((s) => (
          <Pressable key={s} onPress={() => dispatch(setSort(s))} style={buttonStyle(s === sortBy)}>
            <AppText variant="body3" color={s === sortBy ? "primaryPurple" : "darkGrey"}>
              {s}
            </AppText>
          </Pressable>
        ))}
      </View>
      <View style={sheet.sortOptions}>
        {ratings.map((r) => (
          <Pressable
            key={r}
            onPress={() => dispatch(setMinRating(r))}
            style={buttonStyle(r === minimumRating)}
          >
            <AppText variant="body3" color={r === minimumRating ? "primaryPurple" : "darkGrey"}>
              {r}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const sheet = StyleSheet.create({
  container: { gap: spacing.x_sm },
  sortOptions: { flexDirection: "row", gap: spacing.x_sm },
  button: {
    paddingVertical: spacing.xx_sm + 2,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.sm,
  },
});
