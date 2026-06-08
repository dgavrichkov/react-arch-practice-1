import fetches from "@siberiacancode/fetches";

const BASE_URL = "https://rickandmortyapi.com/api/";

export const httpClient = fetches.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => (status >= 200 && status < 300) || status == 404,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);
