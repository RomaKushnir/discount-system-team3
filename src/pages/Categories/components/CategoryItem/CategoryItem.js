import { React } from 'react';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import { useTranslation } from 'react-i18next';
import styles from './CategoryItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';

function CategoryItem({
  category,
  onEdit,
  onDelete
}) {
  const { t } = useTranslation();
  return (
        <div className={styles.categoryBlock}>
        <KeyboardArrowDownOutlinedIcon />
      <div className={styles.categoryText}>
        <p>{category.title}</p>
      </div>
      <div className={styles.buttons}>
      <ItemActionButton
          title={t('edit')}
          className={styles.editBtn}
          type="edit"
          name = "edit"
          onActionClick={(e) => {
            e.stopPropagation();
            onEdit(e, category.id);
          }}
        />
        <ItemActionButton
          title={t('delete')}
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
