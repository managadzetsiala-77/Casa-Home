import { create } from "zustand";

const getInitialTheme = () => {
  return localStorage.getItem("theme") === "dark";
};

export const useThemeStore = create((set) => ({
  isDark: getInitialTheme(),

  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDark;

      localStorage.setItem(
        "theme",
        newTheme ? "dark" : "light"
      );

      return {
        isDark: newTheme,
      };
    }),
}));