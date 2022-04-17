import styles from "./Home.module.css";
import image from "../../img/saving.svg";
import LinkButton from "../layout/LinkButton";

function Home(){
  return(
    <section className={styles.home_container}>
      <h1>Welcome to <span>Costs</span></h1>
      <p>Start making your projects now!</p>
      <LinkButton to='/newproject' text="Criate project"/>
      <img src={image} alt="Costs" />
    </section>
  )
}

export default Home;