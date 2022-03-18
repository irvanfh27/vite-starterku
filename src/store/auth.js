import { defineStore } from "pinia";
import Cookies from "js-cookie";
import http from "@/plugins/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: Cookies.get("authToken") ?? false,
    user: null,
    isError: true,
    isLoading: false,
    errValidations: false,
    errCode: false,
  }),
  actions: {
    async checkAuthenticated() {
      const user = useUserStore();
      await http
        .get("/user", {
          headers: {
            Authorization: "Bearer " + this.isAuthenticated,
          },
        })
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          Cookies.remove("authToken");
          this.isAuthenticated = false;
        });
      return this.isAuthenticated;
    },
    async login(data) {
      this.isLoading = true;
      await http
        .post("/login", data)
        .then((res) => {
          Cookies.set("authToken", res.data.data.access_token);
          this.isAuthenticated = res.data.data.access_token;
          this.isError = false;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          this.errValidations = err.data.error;
          this.errCode = err.status;
        });

      return this.isAuthenticated;
    },
    async register(payload) {
      this.isLoading = true;
      await http
        .post("/register", payload)
        .then((res) => {
          Cookies.set("authToken", res.data.data.access_token);
          this.isAuthenticated = res.data.data.access_token;
          this.isError = false;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.errValidations = err.data.errors;
        });
      return this.isAuthenticated;
    },
    async logout() {
      await http
        .post("/logout", "", {
          headers: {
            Authorization: "Bearer " + this.isAuthenticated,
          },
        })
        .then((res) => {
          Cookies.remove("authToken");
          this.isAuthenticated = false;
        })
        .catch((err) => {});
      return this.isAuthenticated;
    },
  },
});
