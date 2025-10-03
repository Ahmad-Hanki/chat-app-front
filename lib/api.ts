import env from "@/secrets/env";
import axios from "axios";

const apiClient = axios.create({
  baseURL: env.apiUrl,
});
