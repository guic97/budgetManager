import { useState, useEffect } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from "./ProjectForm.module.css";

function ProjectForm({handleSubmit, projectData, btnText}) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData);

  useEffect(()=> {
    fetch("http://localhost:5000/categories",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      },
    })
    .then((awn) => awn.json())
    .then((data) => { setCategories(data) })
    .catch((err) => console.log(err))
  }, [])
  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  }
  function handleChange(e) {
    setProject({ ...project, [e.target.name]:e.target.value})
  }
  function handleCategory(e) {
    setProject({...project,
      category:{
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    }) 
  }
 
  return( // Error 1 in the Select handleOnChange
    <form onSubmit={submit} className={styles.form}>
        <Input name="name" text="Project name" type="text" placeholder="Put the project name" handleOnChange={handleChange}/>
        <Input name="budget" text="Project budget" type="number" placeholder="Put the total budget" handleOnChange={handleChange}/>
        <Select name="category_id" text='Select the category' options={categories} handleOnChange={handleCategory}/>
        <SubmitButton type="submit" text={btnText}/>
    </form>
  )
}
export default ProjectForm;