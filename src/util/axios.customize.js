import axios from "axios";

//custom axios instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,  
})

// Request interceptors
instance.interceptors.request.use((config) =>{
    return config
}, (error) =>{
    return Promise.reject(error)
})

// Response interceptors
instance.interceptors.response.use((response) =>{
    if(response && response.data){
        return response.data
    }
    return response
}, (error) =>{
    return Promise.reject(error)
})

export default instance