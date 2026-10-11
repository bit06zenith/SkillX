import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:5000"
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");

    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }

    return config;
});

export default api;

// Instead of doing this everywhere:
// axios.post("http://localhost:8080/api/auth/register",...)
// we'll eventually do: api.post("/api/auth/register",...)
// If the backend URL changes later, you change it in one place.