import styles from './Button.module.scss';

function Button({
  btnText,
  onClick,
  isDisabled = false,
  name,
  type
}) {
  return (
    <button
      className = {styles.btn}
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
