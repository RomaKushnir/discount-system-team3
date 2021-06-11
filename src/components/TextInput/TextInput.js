import styles from './TextInput.module.scss';

function TextInput(
  {
    label,
    onValueChange,
    placeholder,
    style,
    name
  }
) {
  return (
    <div className={styles.wrap}>
      {label != null && <label htmlFor={name}>{label}</label>}
      <input
        className={styles.input}
        style={style}
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        onInput={onValueChange}
      />
    </div>
  );
}

export default TextInput;
