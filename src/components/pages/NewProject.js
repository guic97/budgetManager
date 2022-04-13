import { useNavigate } from "react-router-dom";

import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {

  const navegate = useNavigate();
  
  function createPost(project) {
    project.costs = 0;
    project.services = [];

    fetch('http://localhost:5000/projects',{
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      navegate('/projects',{message: 'Project created successfully!'}) // Error 2
    })
    .catch((err) => console.log(err))
  }
  

  return(
    <div className={styles.newproject_container}>
      <h1>New project</h1>
      <p>Criate your project for after add services</p>
      <ProjectForm handleSubmit={createPost} btnText="Criate Project"/>
    </div>
  )
}

export default NewProject;