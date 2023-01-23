import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

export const createApi = () => {
    api = axios.create({
    })

    // set interceptoro for all requests
    api.interceptors.request.use((config) => {

        return config;
    })

    return api;
}


export const useApi = () => {
    if (!api) {
        createApi();
    }
    return api;
}