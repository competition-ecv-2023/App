import axios from "axios";

export const useApi = () => {
    return axios.create({
        baseURL: "https://cc0e-2001-861-34c7-59d0-bcc5-9f11-5f48-9f2e.ngrok-free.app/patperdue/v1/",
        headers: {
            "Authorization": "Bearer ZKqZfeQZtJpXWuBe3T4HBr5FSWFdc6zhQPmeZDrEtQBUnxSxgDqNRSAw3CzSEyu8FPt6aNgHrVj4j7tfyGpLwGzm3sgz8qLdCTykHYEaGJm3ykGvPG5qznaK",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

