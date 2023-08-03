import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "@/constans/api.ts";

export const getUserKey = defineStore("userAccessKey", () => {
  const state = ref({
    userAccessKey: "",
  });

  const getKey = () => {
    axios
      .get(API_URL + "/users/accessKey")
      .then((res) => (state.value.userAccessKey = res.data.accessKey));
  };
  return {
    state,
    getKey,
  };
});
