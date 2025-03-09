import axios from "axios";

export const getAxiosInstance = () =>
  axios.create({
    baseURL: "https://body-vault-server-b9ede5286d4c.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
    },
  });
