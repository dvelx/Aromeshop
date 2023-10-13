export let API_URL: string;
// http://185.185.68.144:3000/api
// http://192.168.0.183:3000/api
if (import.meta.env.PROD) {
  API_URL = "http://185.185.68.144:3000/api";
}
if (import.meta.env.DEV) {
  API_URL = "http://192.168.0.183:3000/api";
}
