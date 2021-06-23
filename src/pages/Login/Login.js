import { useState } from 'react';
import styles from './Login.module.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import PasswordField from './components/PasswordField';

const inputStyles = {
  width: '330px',
  height: '45px'
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const onLoginButtonClick = () => {
    console.log(email, password);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onEyeClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <div className = {styles.container}>
      <div className={styles.logo}>Discount<span className={styles.logoItem}>App</span></div>
      <main className={styles.contentWrapper}>
        <div className = {styles.inputsContainer}>
          <TextInput
            onValueChange = {onEmailChange}
            placeholder = "Email"
            label = "Email"
            style = {inputStyles}
            name = "email"
            type = "email"
            // onBlur={onBlur}
            required
            // touched = {touched.email}
            // error = {errors.email}
            />
          <PasswordField
            onValueChange = {onPasswordChange}
            placeholder = "Password"
            label = "Password"
            name = "password"
            type = {passwordVisibility ? 'text' : 'password'}
            onIconClick = {onEyeClick}
            passwordVisibility = {passwordVisibility}
            // onBlur={onBlur}
            required
            // touched = {touched.email}
            // error = {errors.email}
          />
        </div>
        <div className = {styles.buttonContainer}>
          <Button
            btnText = "Login"
            onClick = {onLoginButtonClick}
            // isDisabled = {isDisabled}
            type = "submit"
          />
        </div>
      </main>
    </div>
  );
}

export default Login;
