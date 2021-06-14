import styles from './Button.module.scss';

function Button({
  btnText,
  onClick,
  isDisabled = false,
  name
}) {
  return (
    <button
      className = {styles.btn}
      onClick = {onClick}
      disabled = {isDisabled}
      name = {name}
    >
      {btnText}
    </button>
  );
}

export default Button;
