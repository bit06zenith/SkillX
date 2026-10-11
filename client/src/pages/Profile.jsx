import {useContext,useEffect,useState} from "react";
import {AuthContext} from "../context/AuthContext";
import api from "../services/api";
import CurrentSkills from "../components/CurrentSkills";

function Profile(){
    const {user}=useContext(AuthContext);

    const [profile,setProfile]=useState(null);
    const [jobRoles,setJobRoles]=useState([]);
    const [formData,setFormData]=useState({
        branch:"",
        semester:"",
        targetJobRoleId:""
    });

    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    const [saving,setSaving]=useState(false);
    const [saveMessage,setSaveMessage]=useState("");

    useEffect(()=>{
        const loadProfile=async()=>{
            try{
                const [profileResponse,rolesResponse]=await Promise.all([
                    api.get("/api/profile"),
                    api.get("/api/job-roles")
                ]);

                const data=profileResponse.data.profile;

                setProfile(data);
                setJobRoles(rolesResponse.data.jobRoles||[]);

                setFormData({
                    branch:data.branch||"",
                    semester:data.semester?.toString()||"",
                    targetJobRoleId:data.targetJobRoleId?.toString()||""
                });
            }catch(err){
                setError(
                    err.response?.data?.message||
                    "Could not load profile."
                );
            }finally{
                setLoading(false);
            }
        };

        loadProfile();
    },[]);

    const handleSave=async()=>{
        setError("");
        setSaveMessage("");

        if(!formData.branch.trim()||!formData.semester||!formData.targetJobRoleId){
            setError("Please complete all profile fields");
            return;
        }

        try{
            setSaving(true);

            const response=await api.put("/api/profile",{
                branch:formData.branch,
                semester:Number(formData.semester),
                targetJobRoleId:Number(formData.targetJobRoleId)
            });

            if(response.data.profile){
                setProfile(response.data.profile);
            }

            setSaveMessage("Profile updated successfully.");
        }catch(err){
            setError(
                err.response?.data?.message||
                "Could not save profile."
            );
        }finally{
            setSaving(false);
        }
    };

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    return(
        <div className="max-w-2xl p-6">
            <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

            {loading&&<p>Loading profile...</p>}
            {error&&<p className="text-red-600">{error}</p>}

            {!loading&&profile&&(
                <div className="space-y-5">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            className="w-full rounded border p-2"
                            value={user?.name||""}
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            className="w-full rounded border p-2"
                            value={user?.email||""}
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Branch</label>
                        <input
                            className="w-full rounded border p-2"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Semester</label>
                        <input
                            className="w-full rounded border p-2"
                            type="number"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Target Job Role</label>
                        <select
                            className="w-full rounded border p-2"
                            name="targetJobRoleId"
                            value={formData.targetJobRoleId}
                            onChange={handleChange}
                        >
                            <option value="">Select a job role</option>

                            {jobRoles.map((role)=>(
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {saveMessage&&<p className="text-green-600">{saveMessage}</p>}

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
                    >
                        {saving?"Saving...":"Save Changes"}
                    </button><CurrentSkills/>
                </div>
            )}
        </div>
    );
}

export default Profile;