import AddIcon from '@material-ui/icons/Add';
import styles from './AddNewItemButton.module.scss';

function AddNewItemButton({
  btnTitle,
  onAddNewItem,
  name,
  iconSize = 'large',
  className = ''
}) {
  return (
    <button
      type="button"
      className={`${styles.addBtn} ${className}`}
      onClick={onAddNewItem}
      name = {name}
    >
      <AddIcon fontSize={iconSize} />
      <span>{btnTitle}</span>
    </button>
  );
}

export default AddNewItemButton;
