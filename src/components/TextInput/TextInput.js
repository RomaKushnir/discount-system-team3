import styles from './TextInput.module.scss';

function TextInput(
  {
    label,
    onValueChange,
    placeholder,
    style,
    name,
    type,
    value
  }
) {
  return (
    <div className={styles.wrap}>
      {label != null && <label htmlFor={name}>{label}</label>}
      <input
        className={styles.input}
        style={style}
        type= {type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onValueChange}
        value = {value}
      />
    </div>
  );
}

export default TextInput;
