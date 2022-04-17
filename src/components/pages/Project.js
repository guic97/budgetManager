import styles from "./Project.module.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";

function Project() {
  const {id} = useParams();
  
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  useEffect(()=>{
    fetch(`http://localhost:5000/projects/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      }
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      setProject(data)
    })
    .catch((err)=>console.log(err))
  }, [id])

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm);
  }

  function editPost(project) {
    if(project.cost > project.budget){
      //message
    }
  }

  return(
    <>{project.name ? (
      <div className={styles.projectDetails}>
        <Container customClass="column">
          <div className={styles.detailsContainer}>
            <h1>Project: {project.name}</h1>
            <button className={styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? "Edit project": "Close"}
            </button>
            {!showProjectForm ? (
              <div className={styles.hundredPercentWidth}>
                <p>
                  <span>Category:</span> {project.category.name}
                </p>
                <p>
                  <span>Total budget:</span> ${project.budget}
                </p>
                <p>
                  <span>Total used:</span> ${project.cost}
                </p>
                
              </div>
            ) : (
              <div className={styles.hundredPercentWidth}>
                <ProjectForm handleSubmit={editPost} btnText="Done" projectData={project}/>
              </div>
            )}
          </div>
        </Container>
      </div>
      ):( <Loading />)}
    </>
  )
}
export default Project;