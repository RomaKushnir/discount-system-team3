import styles from './InputText.module.scss';

export default function InputText(
  {
    label,
    className = '',
    onInput,
    placeholder,
    name,
    value = ''
  }
) {
  return (
    <div className={styles.wrap}>
      {label != null && <label htmlFor={name}>{ label }</label>}
      <input
        className={`${styles.input} ${styles[className]}`}
        type='text'
        id={name}
        name={name}
        placeholder={placeholder}
        onInput={onInput}
        value={value}
      />
    </div>
  );
}
