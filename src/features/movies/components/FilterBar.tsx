import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import AppText from "@/shared/ui/app-text";
import { Pressable, StyleSheet, View } from "react-native";
import { setMinRating, setSort, SORT_OPTIONS } from "../filtersSlice";

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const { minimumRating, sortBy } = useAppSelector((s) => s.filters);
  const ratings = [0, 5, 7, 8];

  return (
    <View style={sheet.container}>
      <View style={sheet.sortOptions}>
        {SORT_OPTIONS.map((s) => (
          <Pressable
            key={s}
            onPress={() => dispatch(setSort(s))}
            style={[sheet.button, s === sortBy && sheet.active]}
          >
            <AppText style={sheet.label}>{s}</AppText>
          </Pressable>
        ))}
      </View>
      <View style={sheet.sortOptions}>
        {ratings.map((r) => (
          <Pressable
            key={r}
            onPress={() => dispatch(setMinRating(r))}
            style={[sheet.button, r === minimumRating && sheet.active]}
          >
            <AppText style={sheet.label}>{r}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const sheet = StyleSheet.create({
  container: {},
  sortOptions: { flexDirection: "row", gap: 8 },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  active: { borderColor: "blue", backgroundColor: "#e6efff" },
  label: { color: "orange" },
});
