import { atom, selector } from "recoil";

export const isLoggedInState = atom<boolean>({
  key: "loggedInState",
  default: true,
});

export const isLoggedInSelector = selector<boolean>({
  key: "isLoggedIn",
  get: ({ get }) => {
    const isLoggedIn = get(isLoggedInState);

    return isLoggedIn;
  },
});
