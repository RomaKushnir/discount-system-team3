import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Login.module.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import PasswordField from './components/PasswordField';
import { emailValidation, passwordValidation } from '../../utilities/validation';
import * as actions from '../../store/actions';

const inputStyles = {
  width: '330px',
  height: '45px'
};

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(false);

  const loginStatus = useSelector((state) => state.userReducer.loginStatus);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailTouched(true);
    setEmailError(null); // remove whatever error was there previously
    setLoginDisabled(false);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
    setPasswordError(null); // remove whatever error was there previously
    setLoginDisabled(false);
  };

  const onEyeClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onEmailBlur = (e) => {
    const error = emailValidation(e.target.value);
    setEmailError(error);
    setLoginDisabled(false);
  };

  const onPasswordBlur = (e) => {
    const error = passwordValidation(e.target.value);
    setPasswordError(error);
    setLoginDisabled(false);
  };
  const onLoginButtonClick = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    const errorEmail = emailValidation(email);
    setEmailError(errorEmail);
    const errorPassword = passwordValidation(password);
    setPasswordError(errorPassword);

    if (
      emailError === null && passwordError === null
      && email && password // no empty fields
      && emailTouched && passwordTouched // every touched field is true
    ) {
      setLoginDisabled(false);
      dispatch(actions.userActions.login({ email, password }));
    } else {
      setLoginDisabled(true);
    }
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
            onBlur={onEmailBlur}
            required
            touched = {emailTouched}
            error = {emailError}
            />
          <PasswordField
            onValueChange = {onPasswordChange}
            placeholder = "Password"
            label = "Password"
            name = "password"
            type = {passwordVisibility ? 'text' : 'password'}
            onIconClick = {onEyeClick}
            passwordVisibility = {passwordVisibility}
            onBlur={onPasswordBlur}
            required
            touched = {passwordTouched}
            error = {passwordError}
          />
        </div>
        {loginStatus.loading === false && loginStatus.error
          && <div className = {styles.errorMessage}>
            {loginStatus.error.message}
          </div>
        }
        <div className = {styles.buttonContainer}>
          <Button
            btnText = "Login"
            onClick = {onLoginButtonClick}
            isDisabled = {loginDisabled}
            type = "submit"
          />
        </div>
        {loginStatus.loading === true
          && <div className = {styles.loadingContainer}>
              <CircularProgress />
          </div>
        }
      </main>
      <ToastContainer />
    </div>
  );
}

export default Login;
