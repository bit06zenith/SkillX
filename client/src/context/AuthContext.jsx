import {createContext,useEffect,useState} from "react";
import api from "../services/api";

const AuthContext=createContext();

function AuthProvider({children}){
    const [user,setUser]=useState(null);
    //const [token,setToken]=useState(null); -> no token? redirect to login
    const [token,setToken]=useState(localStorage.getItem("token"));

    const isAuthenticated=!!token;

    const login=(newToken,newUser)=>{
        localStorage.setItem("token",newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout=()=>{
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    useEffect(()=>{
        const storedToken=localStorage.getItem("token");

        if(!storedToken){
            return;
        }

        const getUser=async()=>{
            try{
                const response=await api.get("/api/auth/me");
                setUser(response.data.user);
            }catch(err){
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            }
        };

        getUser();
    },[]);

    return(
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext,AuthProvider};

// user → currently logged-in student's data.
// token → JWT stored in browser.
// isAuthenticated → true when a token exists, otherwise false.