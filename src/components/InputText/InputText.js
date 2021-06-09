import styles from './InputText.module.scss';

export default function InputText(
  {
    className = '',
    onInput,
    placeholder,
    label
  }
) {
  return (
    <div className={ styles.wrap }>
      { label != null && <label>{ label }</label> }
      <input
        className={ `${styles.input} ${styles[className]}` }
        type='text'
        placeholder={ placeholder }
        onInput={ onInput }
      />
    </div>
  );
}
