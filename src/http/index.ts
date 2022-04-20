import axios from 'axios'

export const http = axios.create({
    withCredentials: true,
    baseURL: "http://127.0.0.1:8080/api/"
})

