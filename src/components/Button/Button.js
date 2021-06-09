import styles from './Button.module.scss';

function Button({
  btnText,
  onClick,
  isDisabled = false
}) {
  return (
    <button className = {styles.btn} onClick = {onClick} disabled = {isDisabled}>{btnText}</button>
  );
}

export default Button;
