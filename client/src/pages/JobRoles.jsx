import {useEffect,useState} from "react";
import api from "../services/api";

function JobRoles(){
    const [jobRoles,setJobRoles]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

    useEffect(()=>{
        const loadJobRoles=async()=>{
            try{
                const response=await api.get("/api/job-roles");
                setJobRoles(response.data.jobRoles||[]);
            }catch(err){
                setError(
                    err.response?.data?.message||
                    "Could not load job roles."
                );
            }finally{
                setLoading(false);
            }
        };

        loadJobRoles();
    },[]);

    return(
        <div className="max-w-4xl p-6">
            <h1 className="mb-2 text-3xl font-bold">Job Roles</h1>

            <p className="mb-6 text-gray-600">
                Explore technical roles and find the career path that suits you.
            </p>

            {loading&&<p>Loading job roles...</p>}

            {error&&<p className="text-red-600">{error}</p>}

            {!loading&&!error&&jobRoles.length===0&&(
                <p>No job roles available.</p>
            )}

            {!loading&&!error&&jobRoles.length>0&&(
                <div className="grid gap-4 sm:grid-cols-2">
                    {jobRoles.map((role)=>(
                        <div
                            key={role.id}
                            className="rounded-xl border p-5 shadow-sm"
                        >
                            <h2 className="mb-2 text-xl font-semibold">
                                {role.name}
                            </h2>

                            <p className="text-gray-600">
                                {role.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JobRoles;