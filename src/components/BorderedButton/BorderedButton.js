import ButtonStyles from '../Button/Button.module.scss';
import styles from './BorderedButton.module.scss';

export default function BorderedButton({
  btnText,
  onClick,
  isDisabled = false
}) {
  return (
    <button
      className = {`${ButtonStyles.btn} ${styles.btn_bordered}`}
      onClick = {onClick}
      disabled = {isDisabled}
    >{btnText}</button>
  );
}
