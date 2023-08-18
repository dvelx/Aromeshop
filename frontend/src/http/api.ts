import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/constans/apiURL.ts";

const accessKey = localStorage.getItem("userAccessKeyAroma");
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
  params: {
    accessKey: accessKey,
  },
});
