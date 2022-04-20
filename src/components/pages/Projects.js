import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Projects.module.css";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState();
  const [type, setType] = useState();

  useEffect(()=>{
    fetch("http://localhost:5000/projects",
      {
        method:"GET",
        headers: {
          "Content-type":"application/json",
        },
      })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err))
  },[]);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`,
      {
        method:"DELETE",
        headers: {
          "Content-type":"application/json",
        },
      })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage("Project removed successfully!")
        setType("success")
      })
      .catch(err => console.log(err))
  }

    //Class number #25.
    return(
      <div className={styles.project_container}>
        <div className={styles.project_title}>
          <h1>My projects</h1>
          <LinkButton to='/newproject' text="Criate project"/>
        </div>
        {projectMessage && <Message type={type} msg={projectMessage} />}
        <Container customClass="start">
          {projects.length > 0 &&
            projects.map((project) => 
            <ProjectCard 
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}

              handleRemove={removeProject}
          />)}
          {!removeLoading && <Loading/>}
          {removeLoading && projects.length === 0 && (
            <p>No projects!</p>
          )}
        </Container>
      </div>
    )
  }
  
  export default Projects;