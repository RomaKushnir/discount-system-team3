import styles from './OutlineButton.module.scss';

function OutlineButton({
  btnText,
  onClick,
  isDisabled = false,
  className = ''
}) {
  return (
    <button
      className = {`${styles.btn} ${styles.btnBordered} ${className}`}
      onClick = {onClick}
      disabled = {isDisabled}
    >{btnText}</button>
  );
}

export default OutlineButton;
