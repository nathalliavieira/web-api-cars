import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333"
}) //em baseURL é o caminho do nosso backend