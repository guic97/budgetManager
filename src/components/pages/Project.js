import styles from "./Project.module.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { v4 as uuidv4} from "uuid";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const {id} = useParams();
  
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

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
      setServices(data.services)
    })
    .catch((err)=>console.log(err))
  }, [id])

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function removeService(id, cost) {
    setMessage("");
    const servicesUpdated = project.services.filter((service)=>service.id !== id);
    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.costs = parseFloat(projectUpdated.costs) - parseFloat(cost);
   
    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method:"PATCH",
      headers: {
        "content-type":"application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
    .then(resp => resp.json())
    .then((data)=>{
      setProject(projectUpdated);
      setServices(servicesUpdated);
      setMessage("Service removed!");
      setType("success");
    })
    .catch((err)=>(console.log(err)));
  }

  function editPost(project) {
    setMessage('');

    if(project.costs > project.budget){
      setMessage("The cost value is bigger than budget's");
      setType("error");
      return false;
    }
    if(project.budget < 0){
      setMessage("The budget value cannot be lower than zero");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method:"PATCH",
      headers: {
        "content-type":"application/json",
      },
      body: JSON.stringify(project),
    })
    .then(resp => resp.json())
    .then((data)=>{
      setProject(data);
      setShowProjectForm(false);
      setMessage("The changes were made successfully");
      setType("success");
    })
    .catch((err)=>(console.log(err)));
  }

  function createService(project){
    setMessage('')
    const lastService = project.services[project.services.length -1]

    lastService.id = uuidv4()
    const lastServiceCost = lastService.cost
  
    const newCost = parseFloat(project.costs /*Error*/) + parseFloat(lastServiceCost)
    if (newCost > parseFloat(project.budget)) {
      setMessage("Exceeded budget amount")
      setType("error")
      project.services.pop()
      return false
    }
    project.costs = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method:"PATCH",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(project),
    })
    .then(resp=>resp.json())
    .then((data)=>{
      setShowServiceForm(false)
    })
    .catch(err=>console.log(err))
  }

  return(
    <>{project.name ? (
      <div className={styles.projectDetails}>
        {message && <Message type={type} msg={message} />}
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
                  <span>Total used:</span> ${project.costs}
                </p>
                
              </div>
            ) : (
              <div className={styles.hundredPercentWidth}>
                <ProjectForm handleSubmit={editPost} btnText="Done" projectData={project}/>
              </div>
            )}
          </div>
          <div className={styles.serviceFormContainer}>
            <h2>Add a service:</h2>
            <button className={styles.btn} onClick={toggleServiceForm}>
              {!showServiceForm ? "Add service": "Close"}
            </button>
            <div className={styles.hundredPercentWidth}>
              {showServiceForm && (
                <ServiceForm
                  handleSubmit={createService}
                  btnText="Add service"
                  projectData={project}
                />
              )}
            </div>
          </div>
          <h2>Services</h2>
          <Container customClass="start">
            {services.length > 0 &&
              services.map((services)=>(
                <ServiceCard
                  id={services.id}
                  name={services.name}
                  cost={services.cost}
                  description={services.description}
                  key={services.id}
                  handleRemove={removeService}
                />
            ))}
            {services.length === 0 && <p>No projects to show</p>}
          </Container>
        </Container>
      </div>
      ):( <Loading />)}
    </>
  )
}
export default Project;