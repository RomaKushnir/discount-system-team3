import { React, useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styles from './CategoryItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';

function CategoryItem({
  category,
  onEdit,
  onDelete
}) {
  const [isItemOpen, setItemOpen] = useState(false);
  return (
        <div className={styles.categoryBlock} onClick = {() => setItemOpen(!isItemOpen)}>
        {isItemOpen
          ? <KeyboardArrowDownIcon />
          : <KeyboardArrowUpIcon />
        }
      <div className={styles.categoryText}>
        <p>{category.title}</p>
      </div>
      <div className={styles.buttons}>
      <ItemActionButton
          title="Edit"
          className={styles.editBtn}
          type="edit"
          name = "edit"
          onActionClick={(e) => {
            e.stopPropagation();
            onEdit(e, category.id);
          }}
        />
        <ItemActionButton
          title="Delete"
          className={styles.deleteBtn}
          type="delete"
          name = "delete"
          onActionClick={(e) => {
            e.stopPropagation();
            onDelete(category.id);
          }}
        />
      </div>
        </div>
  );
}

export default CategoryItem;
