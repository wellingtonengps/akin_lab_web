import type { AuthResponse } from "@/types/authResponse";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): { user: AuthResponse | null } => ({
    user: JSON.parse(
      localStorage.getItem("user") || "null"
    ) as AuthResponse | null,
  }),
  actions: {
    setUser(user: AuthResponse) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
