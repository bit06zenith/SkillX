
// App.jsx -> traffic controller for your frontend

import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import JobRoles from "./pages/JobRoles";
import SkillGap from "./pages/SkillGap";
import Recommendations from "./pages/Recommendations";
import MainLayout from "./layouts/MainLayout";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/job-roles" element={<JobRoles/>}/>
                    <Route path="/skill-gap" element={<SkillGap/>}/>
                    <Route path="/recommendations" element={<Recommendations/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;