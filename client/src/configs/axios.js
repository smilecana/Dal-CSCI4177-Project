import axios from "axios";

const baseURL = "http://localhost:5000";

const instance = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default instance;