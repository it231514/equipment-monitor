import { atom, selector } from "recoil";

export const isLoggedInState = atom<boolean>({
  key: "loggedInState",
  default: false,
});

export const isLoggedInSelector = selector<boolean>({
  key: "isLoggedIn",
  get: ({ get }) => {
    const isLoggedIn = get(isLoggedInState);

    return isLoggedIn;
  },
});
