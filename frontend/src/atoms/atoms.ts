import { atom } from "recoil";

export const loggedInState = atom({
  key: "isLoggedIn",
  default: localStorage.getItem("isLoggedIn") || false,
});
