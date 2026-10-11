import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

function Register(){
    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
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

        if(!formData.name.trim()){
            setError("Name is required");
            return;
        }

        if(!formData.email.includes("@")){
            setError("Enter a valid email");
            return;
        }

        if(formData.password.length<6){
            setError("Password must be at least 6 characters");
            return;
        }

        if(formData.password!==formData.confirmPassword){
            setError("Passwords do not match");
            return;
        }

        try{
            setLoading(true);

            await api.post("/api/auth/register",{
                name:formData.name,
                email:formData.email,
                password:formData.password
            });

            navigate("/login");
        }catch(err){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            }else{
                setError("Registration failed. Please try again.");
            }
        }finally{
            setLoading(false);
        }
    };

    return(
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                {error&&<p>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading?"Registering...":"Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;



// Name required             ✅
// Email validation          ✅ no email verification added
// Password minimum length   ✅
// Password confirmation     ✅
// Backend error             ✅
// Loading state             ✅
// Button disabled loading   ✅
// POST /api/auth/register   ✅
// Success → /login          ✅