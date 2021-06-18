import { Link } from 'react-router-dom';
import Routes from '../../../../routes';
import styles from './VendorListItem.module.scss';
import ItemActionButton from '../../../../components/ItemActionButton';

function VendorListItem({ vendor, onEdit, onDelete }) {
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
          onActionClick={(e) => onEdit(e, vendor.id)}
          className={styles.editBtn}
          name = "edit"
        />
        <ItemActionButton
          title="Delete"
          type="delete"
          className={styles.deleteBtn}
          onActionClick={() => onDelete(vendor.id)}
          name = "delete"
        />
        <Link to={`${Routes.VENDOR}/${vendor.id}`} className={styles.detailsBtn}>View</Link>
      </div>
    </div>
  );
}

export default VendorListItem;
