import axios from "axios";

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
