import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthStatus = "bootstrapping" | "unauthenticated" | "authenticated";

interface AuthState {
  status: AuthStatus;
  token: string | null;
}

const initialState: AuthState = { status: "bootstrapping", token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<string>) {
      state.status = "authenticated";
      state.token = action.payload;
    },
    signedOut(state) {
      state.status = "unauthenticated";
      state.token = null;
    },
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;
