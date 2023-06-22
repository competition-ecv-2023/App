import axios from "axios";

export const API_ADDRESS: string = "https://b6df-2001-861-34c7-59d0-4eb-f874-bde3-bca2.ngrok-free.app/patperdue";
export const useApi = () => {
    return axios.create({
        baseURL: API_ADDRESS + "/v1/",
        headers: {
            Authorization: "Bearer ZKqZfeQZtJpXWuBe3T4HBr5FSWFdc6zhQPmeZDrEtQBUnxSxgDqNRSAw3CzSEyu8FPt6aNgHrVj4j7tfyGpLwGzm3sgz8qLdCTykHYEaGJm3ykGvPG5qznaK",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};
