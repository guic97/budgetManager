import styles from "./Input.module.css";

function Input({type, name, placeholder, text, handleOnChange, value}) {
  return(
    <div className={styles.form_input}>
      <label htmlFor={name}>{text}</label>
      <input type={type} name={name} id={name} placeholder={placeholder} onChange={handleOnChange} value={value}/>
    </div>
  )
}

export default Input;