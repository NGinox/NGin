import axios, {CreateAxiosDefaults} from "axios";
import {errorCatch} from "./error.ts";

const options: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_REACT_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const axiosInstance = axios.create(options)

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Use the errorCatch function to handle errors
        const errorMessage = errorCatch(error);
        console.error('API Error:', errorMessage); // You can log the error or handle it as needed
        return Promise.reject(errorMessage);
    }
);

export default axiosInstance