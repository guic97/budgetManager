import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  return(
    <div className={styles.newproject_container}>
      <h1>New project</h1>
      <p>Criate your project for after add services</p>
      <ProjectForm/>
    </div>
  )
}

export default NewProject;