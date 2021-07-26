import styles from './TextInput.module.scss';

function TextInput(
  {
    label,
    onValueChange,
    placeholder,
    style,
    name,
    type,
    value,
    onBlur,
    error,
    required = false,
    className = '',
    disabled = false,
    min = '',
    max = ''
  }
) {
  return (
    <div className={`${styles.wrap} ${className}`}>
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
        onBlur = {onBlur}
        required = {required}
        disabled = {disabled}
        min = {min}
        max = {max}
      />
      {error && <div className = {styles.error}>{error}</div>}
    </div>
  );
}

export default TextInput;
