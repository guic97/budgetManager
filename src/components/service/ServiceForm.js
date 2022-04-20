import styles from "../project/ProjectForm.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useState } from "react";


function ServiceForm({handleSubmit, btnText, projectData}){
  
  const [service, setService] = useState({})
  
  function handleChange(e) {
    setService({...service, [e.target.name]: e.target.value})
  }
  function submit(e){
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }
  return(
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Service name"
        name="name"
        placeholder="Put a name for the service"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Service cost"
        name="cost"
        placeholder="Put the service cost"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Service description"
        name="description"
        placeholder="Put the service description"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText}/>
    </form>
  )
}

export default ServiceForm;