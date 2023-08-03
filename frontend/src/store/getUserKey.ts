import { defineStore } from "pinia";
import { ref } from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";

export const getUserKey = defineStore("userAccessKey", () => {
  const state = ref({
    userAccessKey: "",
  });

  const getKey = () => {
    apiDataService.getUserAccessKey().then((res: ResponseData) => state.value.userAccessKey = res.data)
  }
  return {
    state,
    getKey,
  };
})
