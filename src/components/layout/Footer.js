import styles from "./Footer.module.css"
import {FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub} from 'react-icons/fa';

function Footer(){
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li><a target='blank' href="https://www.facebook.com/atila.guilherme.carrao"><FaFacebook/></a></li>
        <li><a target='blank' href=""><FaInstagram/></a></li>
        <li><a target='blank' href="https://www.linkedin.com/in/atila-guilherme-aa5638219/"><FaLinkedin/></a></li>
        <li><a target='blank' href="https://twitter.com/guic97"><FaTwitter/></a></li>
        <li><a target='blank' href="https://github.com/guic97"><FaGithub/></a></li>
      </ul>
      <p className={styles.copy_right}><span>Costs</span> &copy; 2021</p>
    </footer>
  )
}

export default Footer;