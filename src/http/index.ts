import axios from 'axios'
console.log('BASE_URL', process.env.BASE_URL)

export const http = axios.create({
    withCredentials: true
})

