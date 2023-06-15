import axios from "axios";

export const useApi = () => {
    return axios.create({
        baseURL: "https://09a2-2001-861-34c7-59d0-8e6-1919-bc83-6fb7.ngrok-free.app/patperdue/v1/",
        headers: {
            "Authorization": "Bearer ZKqZfeQZtJpXWuBe3T4HBr5FSWFdc6zhQPmeZDrEtQBUnxSxgDqNRSAw3CzSEyu8FPt6aNgHrVj4j7tfyGpLwGzm3sgz8qLdCTykHYEaGJm3ykGvPG5qznaK",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

