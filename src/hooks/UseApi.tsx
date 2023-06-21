import axios from "axios";

export const API_ADDRESS = "https://e07f-195-135-0-87.ngrok-free.app/patperdue";
export const useApi = () => {
  return axios.create({
    baseURL: API_ADDRESS + "/v1/",
    headers: {
      Authorization:
        "Bearer ZKqZfeQZtJpXWuBe3T4HBr5FSWFdc6zhQPmeZDrEtQBUnxSxgDqNRSAw3CzSEyu8FPt6aNgHrVj4j7tfyGpLwGzm3sgz8qLdCTykHYEaGJm3ykGvPG5qznaK",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
