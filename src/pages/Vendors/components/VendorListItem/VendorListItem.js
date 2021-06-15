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
    <div className={styles.itemWrapper}>
      <figure className={styles.imgWrapper}>
        <img src={vendor.imageUrl} alt={vendor.title} />
      </figure>
      <div className={styles.textWrapper}>
        <p className={styles.vendorTitle}>{vendor.title}</p>
        <p className={styles.vendorLocation}>{vendor.location}</p>
        <p className={styles.vendorDescription}>{vendor.description}</p>
      </div>
      <div className={styles.buttons}>
        <ItemActionButton
          title="Edit"
          onActionClick={onEdit}
          className={styles.editBtn}
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
