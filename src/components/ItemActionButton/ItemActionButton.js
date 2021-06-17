import AddIcon from '@material-ui/icons/Add';
import styles from './ItemActionButton.module.scss';

function ItemActionButton({
  title,
  type = 'normal',
  isDisabled = false,
  className = '',
  onActionClick,
  name
}) {
  return (
    <button
      type="button"
      className={`${styles.actionBtn} ${styles[type]} ${className}`}
      disabled={isDisabled}
      onClick={onActionClick}
      name = {name}
    >
      <AddIcon/> {title}
    </button>
  );
}

export default ItemActionButton;
