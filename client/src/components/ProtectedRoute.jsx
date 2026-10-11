import {Navigate,Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

function ProtectedRoute(){
    const {isAuthenticated}=useContext(AuthContext);

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
}

export default ProtectedRoute;

//ProtectedRoute.jsx checks whether a JWT exists.
//If not, it redirects the student to /login; otherwise, it allows the protected page to load.