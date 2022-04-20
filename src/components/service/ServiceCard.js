import styles from "../project/ProjectCard.module.css";
import { BsFillTrashFill} from "react-icons/bs";

function ServiceCard({id, name, description, handleRemove, cost}) {
  
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  }
  return(
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Total cost: </span>${cost}
      </p>
      <p>
        {description}
      </p>
      <div className={styles.projectCardActions}>
        <button onClick={remove}>
          <BsFillTrashFill/>Remove
        </button>
      </div>
    </div>
  )
}

export default ServiceCard;