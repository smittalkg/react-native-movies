import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const SORT_OPTIONS = ["popularity", "rating", "release_date"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

interface FiltersState {
  sortBy: SortOption;
  minimumRating: number | null;
}

const initialState: FiltersState = { sortBy: "popularity", minimumRating: null };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    },
    setMinRating(state, action: PayloadAction<number>) {
      state.minimumRating = action.payload;
    },
  },
});

export const { setSort, setMinRating } = filtersSlice.actions;
export default filtersSlice.reducer;
