import styles from './OutlineButton.module.scss';

function OutlineButton({
  btnText,
  onClick,
  isDisabled = false
}) {
  return (
    <button
      className = {`${styles.btn} ${styles.btnBordered}`}
      onClick = {onClick}
      disabled = {isDisabled}
    >{btnText}</button>
  );
}

export default OutlineButton;
