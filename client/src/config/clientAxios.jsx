import axios from "axios";

export const clientAxios = axios.create({
    baseURL : `${import.meta.env.VITE_URL_BACKEND}`
})