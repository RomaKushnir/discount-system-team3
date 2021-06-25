import { Visibility, VisibilityOff } from '@material-ui/icons';
import styles from './PasswordField.module.scss';

function PasswordField(
  {
    label,
    onValueChange,
    placeholder,
    style,
    name,
    type,
    value,
    onBlur,
    error,
    required = false,
    className = '',
    onIconClick,
    passwordVisibility
  }
) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      {label != null && <label htmlFor={name}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          style={style}
          type= {type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onValueChange}
          value = {value}
          onBlur = {onBlur}
          required = {required}
        />
        <div className = {styles.inputIcon} onClick = {onIconClick}>
          {passwordVisibility === true ? <Visibility/> : <VisibilityOff/>}
        </div>
      </div>
      {error && <div className = {styles.error}>{error}</div>}
    </div>
  );
}

export default PasswordField;
