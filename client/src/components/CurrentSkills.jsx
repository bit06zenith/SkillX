import {useState} from "react";

function CurrentSkills(){
    const [skills,setSkills]=useState([]);
    const [skillName,setSkillName]=useState("");
    const [level,setLevel]=useState("Beginner");
    const [editingId,setEditingId]=useState(null);
    const [editingLevel,setEditingLevel]=useState("Beginner");
    const [error,setError]=useState("");

    const handleAdd=(e)=>{
        e.preventDefault();
        setError("");

        const name=skillName.trim();

        if(!name){
            setError("Enter a skill name");
            return;
        }

        if(skills.some((skill)=>skill.name.toLowerCase()===name.toLowerCase())){
            setError("This skill has already been added");
            return;
        }

        setSkills([
            ...skills,
            {id:Date.now(),name,level}
        ]);

        setSkillName("");
        setLevel("Beginner");
    };

    const handleEdit=(skill)=>{
        setEditingId(skill.id);
        setEditingLevel(skill.level);
    };

    const handleSave=(id)=>{
        setSkills(skills.map((skill)=>
            skill.id===id
                ? {...skill,level:editingLevel}
                : skill
        ));

        setEditingId(null);
    };

    const handleDelete=(id)=>{
        setSkills(skills.filter((skill)=>skill.id!==id));
    };

    return(
        <section className="mt-8 max-w-2xl rounded-xl border p-6">
            <h2 className="mb-2 text-2xl font-bold">My Current Skills</h2>

            <p className="mb-5 text-gray-600">
                Add your technical skills and select your current proficiency level.
            </p>

            <form onSubmit={handleAdd} className="space-y-4">
                <div>
                    <label className="mb-1 block">Skill Name</label>
                    <input
                        className="w-full rounded border p-2"
                        type="text"
                        value={skillName}
                        onChange={(e)=>setSkillName(e.target.value)}
                        placeholder="e.g. Java"
                    />
                </div>

                <div>
                    <label className="mb-1 block">Proficiency Level</label>
                    <select
                        className="w-full rounded border p-2"
                        value={level}
                        onChange={(e)=>setLevel(e.target.value)}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="rounded bg-blue-600 px-5 py-2 text-white"
                >
                    Add Skill
                </button>

                {error&&<p className="text-red-600">{error}</p>}
            </form>

            <div className="mt-6 space-y-3">
                {skills.length===0&&(
                    <p className="text-gray-500">No skills added yet.</p>
                )}

                {skills.map((skill)=>(
                    <div
                        key={skill.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3"
                    >
                        <div>
                            <h3 className="font-semibold">{skill.name}</h3>

                            {editingId===skill.id?(
                                <select
                                    className="mt-2 rounded border p-1"
                                    value={editingLevel}
                                    onChange={(e)=>setEditingLevel(e.target.value)}
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            ):(
                                <p className="text-sm text-gray-600">{skill.level}</p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            {editingId===skill.id?(
                                <button
                                    type="button"
                                    onClick={()=>handleSave(skill.id)}
                                    className="rounded bg-green-600 px-3 py-1 text-white"
                                >
                                    Save
                                </button>
                            ):(
                                <button
                                    type="button"
                                    onClick={()=>handleEdit(skill)}
                                    className="rounded border px-3 py-1"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={()=>handleDelete(skill.id)}
                                className="rounded border border-red-300 px-3 py-1 text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CurrentSkills;