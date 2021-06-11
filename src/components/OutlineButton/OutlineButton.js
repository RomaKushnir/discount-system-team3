import styles from './OutlineButton.module.scss';

function OutlineButton({
  btnText,
  onClick,
  isDisabled = false
}) {
  return (
    <button
      className = {`${styles.btn} ${styles.btn_bordered}`}
      onClick = {onClick}
      disabled = {isDisabled}
    >{btnText}</button>
  );
}

export default OutlineButton;
