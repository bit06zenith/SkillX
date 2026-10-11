import {useState,useContext} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import {AuthContext} from "../context/AuthContext";

function Login(){
    const navigate=useNavigate();
    const {login}=useContext(AuthContext);

    const [formData,setFormData]=useState({
        email:"",
        password:""
    });

    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        setError("");

        if(!formData.email){
            setError("Email is required");
            return;
        }

        if(!formData.password){
            setError("Password is required");
            return;
        }

        try{
            setLoading(true);

            const response=await api.post("/api/auth/login",{
                email:formData.email,
                password:formData.password
            });

            login(response.data.token,response.data.user);

            navigate("/dashboard");
        }catch(err){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            }else{
                setError("Login failed. Please try again.");
            }
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome to SkillX
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to continue your learning journey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email address
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error&&(
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading?"Logging in...":"Sign in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <a href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                        Create an account
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;



//Email + password → POST /api/auth/login → receive JWT → save JWT → /dashboard