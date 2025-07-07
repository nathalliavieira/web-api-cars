import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API
}) //em baseURL é o caminho do nosso backend