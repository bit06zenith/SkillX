import {Link,Outlet} from "react-router-dom";
// outlet -> placeholder
function MainLayout(){
    return(
        <div>
            <header>
                <h1>SkillX</h1>
                <Link to="/profile">Profile</Link>
            </header>

            <div>
                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/job-roles">Job Roles</Link>
                    <Link to="/skill-gap">Skill Gap</Link>
                    <Link to="/recommendations">Learning</Link>
                </nav>

                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;