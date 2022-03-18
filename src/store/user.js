import { defineStore } from "pinia";
import Cookies from "js-cookie";
import http from "@/plugins/axios";
import { useRouter } from "vue-router";
import { reactive } from "vue";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    fullName: "",
    email: "",
    code: "",
    phoneNumber: "",
  }),
  actions: {
    async updateProfile(payload) {
      http
        .post("/user", payload)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {});
    },
  },
});
