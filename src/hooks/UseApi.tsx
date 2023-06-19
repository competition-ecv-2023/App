import axios from "axios";

export const useApi = () => {
    return axios.create({
        baseURL: "https://920e-2001-861-34c7-59d0-c497-1e5b-226b-4e77.ngrok-free.app/patperdue/v1/",
        headers: {
            "Authorization": "Bearer ZKqZfeQZtJpXWuBe3T4HBr5FSWFdc6zhQPmeZDrEtQBUnxSxgDqNRSAw3CzSEyu8FPt6aNgHrVj4j7tfyGpLwGzm3sgz8qLdCTykHYEaGJm3ykGvPG5qznaK",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

