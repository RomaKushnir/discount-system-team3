import styles from './Login.module.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

function Login() {
  return (
    <div className = {styles.container}>
      <main className={styles.contentWrapper}>
        <div className = {styles.inputsContainer}>
          <TextInput/>
          <TextInput/>
        </div>
        <div className = {styles.buttonContainer}>
          <Button />
        </div>
      </main>
    </div>
  );
}

export default Login;
