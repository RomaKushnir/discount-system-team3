import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styles from './CategoryItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';
import Modal from '../../../../components/Modal';
import DeleteConfirmation from '../../../../components/DeleteConfirmation';

function CategoryItem({
  category,
  onEdit,
  onDelete
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const deleteCategoryStatus = useSelector((state) => state.categoryReducer.deleteCategoryStatus);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const onDeleteClick = useCallback((e) => {
    e.stopPropagation();
    setModalOpen(true);
  }, []);
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
          onActionClick={(e) => onDeleteClick(e)}
        />
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <DeleteConfirmation
            onYesClick ={() => onDelete(category.id)}
            onNoClick ={() => setModalOpen(false)}
            status = {deleteCategoryStatus}
            itemTitle = "category"
          />
        </Modal>
      </div>
        </div>
  );
}

export default CategoryItem;
