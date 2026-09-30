import { create } from "zustand";

const storedUser = JSON.parse(localStorage.getItem("currentUser"));

export const useUserStore = create((set) => ({
  currentUser: storedUser || null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",

  login: (user) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    set({ currentUser: user, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    set({ currentUser: null, isLoggedIn: false });
  },
}));
