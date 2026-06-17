import type { AppDispatch } from "@/shared/store";
import { signedIn, signedOut } from "./authSlice";

import { clearToken, getToken, saveToken } from "./tokenStorage";

export function bootstrapAuth() {
  return async (dispatch: AppDispatch) => {
    const token = await getToken();
    if (token) {
      dispatch(signedIn(token));
    } else {
      dispatch(signedOut());
    }
  };
}

export function login(token: string) {
  return async (dispatch: AppDispatch) => {
    await saveToken(token);
    dispatch(signedIn(token));
  };
}

export function logout() {
  return async (dispatch: AppDispatch) => {
    await clearToken();
    dispatch(signedOut());
  };
}
