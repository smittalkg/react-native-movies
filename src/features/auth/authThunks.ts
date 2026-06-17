import type { AppDispatch } from "@/shared/store";
import { signedIn, signedOut } from "./authSlice";

import { getToken } from "./tokenStorage";

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
