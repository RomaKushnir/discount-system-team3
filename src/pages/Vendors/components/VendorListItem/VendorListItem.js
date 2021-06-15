import styles from './VendorListItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';

function VendorListItem({ vendor }) {
  const onEdit = () => {
    // do code to edit item
  };

  const onDelete = () => {
    // do code to delete item
  };

  return (
    <div className={styles['item-wrapper']}>
      <figure className={styles['img-wrapper']}>
        <img src={vendor.imageUrl} alt={vendor.title} />
      </figure>
      <div className={styles['text-wrapper']}>
        <p className={styles['vendor-title']}>{vendor.title}</p>
        <p className={styles['vendor-location']}>{vendor.location}</p>
        <p className={styles['vendor-description']}>{vendor.description}</p>
      </div>
      <div className={styles.buttons}>
        <ItemActionButton
          title="Edit"
          onActionClick={onEdit}
          className={styles['edit-btn']}
        />
        <ItemActionButton
          title="Delete"
          type="delete"
          onActionClick={onDelete}
        />
      </div>
    </div>
  );
}

export default VendorListItem;
