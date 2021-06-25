import React from 'react';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import styles from './CategoryItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';

function CategoryItem({
  category
//   onEdit,
//   onDelete
}) {
  return (
        <div className={styles.categoryBlock}>
        <KeyboardArrowDownOutlinedIcon />
      <div className={styles.categoryText}>
        <p>{category.title}</p>
      </div>
      <div className={styles.buttons}>
      <ItemActionButton
          title="Edit"
          className={styles.editBtn}
          type="edit"
          name = "edit"
        //   onActionClick={(e) => onEdit(e, vendor.id)}
        />
        <ItemActionButton
          title="Delete"
          className={styles.deleteBtn}
        //   onActionClick={onDeleteClick}
          type="delete"
          name = "delete"
        //   onActionClick={() => onDelete(vendor.id)}
        />
      </div>
        </div>
  );
}

export default CategoryItem;
