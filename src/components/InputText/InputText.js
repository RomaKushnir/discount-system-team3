import styles from './InputText.module.scss';

export default function InputText(
  {
    label,
    className = '',
    placeholder,
    onInput
  }
) {
  return (
    <div className={ `${styles['input-wrap']} ${className}` }>
      { label != null && <label>{ label }</label> }
      <input
        type='text'
        placeholder={ placeholder }
        onInput={ onInput }
      />
    </div>
  );
}
