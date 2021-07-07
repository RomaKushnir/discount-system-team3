import styles from './Button.module.scss';

function Button({
  btnText,
  onClick,
  isDisabled = false,
  name,
  className = '',
  type = 'button'
}) {
  return (
    <button
      className = {`${styles.btn} ${className}`}
      onClick = {onClick}
      disabled = {isDisabled}
      name = {name}
      type = {type}
    >
      {btnText}
    </button>
  );
}

export default Button;
