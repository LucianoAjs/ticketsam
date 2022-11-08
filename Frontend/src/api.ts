import axios from "axios";
import { setupInterceptorsTo } from "interceptors/AxiosInterceptors";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

setupInterceptorsTo(api);
