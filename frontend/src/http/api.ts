import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/constans/apiURL.ts";


export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  }
});
