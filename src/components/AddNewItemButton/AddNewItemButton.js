import AddIcon from '@material-ui/icons/Add';
import styles from './AddNewItemButton.module.scss';

function AddNewItemButton({
  btnTitle,
  onAddNewItem
}) {
  return (
    <button
      type="button"
      className={styles.addBtn}
      onClick={onAddNewItem}
    >
      <AddIcon fontSize="large" />
      <span>{btnTitle}</span>
    </button>
  );
}

export default AddNewItemButton;
