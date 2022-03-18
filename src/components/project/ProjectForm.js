import styles from "./ProjectForm.module.css";

function ProjectForm() {
  return(
    <form className={styles.form}>
      <div>
        <input type="text" placeholder="Put the project name"/>
      </div>
      <div>
        <input type="number" placeholder="Put the total budget" />
      </div>
      <div>
        <select name="category_id">
          <option disabled>Select the category</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Criate project" />
      </div>
    </form>
  )
}

export default ProjectForm;