import styles from './Switcher.module.scss';

function Switcher({ onSwitchMode, mode = 'light' }) {
  return (
    <div className = {`${styles.switcher} ${mode === 'light' ? styles.light : styles.dark}`} onClick = {onSwitchMode}>
      <div className = {styles.switcherInner}>
        <div className = {styles.switcherItem}></div>
      </div>
    </div>
  );
}

export default Switcher;
