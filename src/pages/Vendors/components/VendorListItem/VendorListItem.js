import { Link } from 'react-router-dom';
import React from 'react';
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
          title="Delete"
          className={styles.deleteBtn}
          type="delete"
          name = "delete"
          onActionClick={() => onDelete(vendor.id)}
        />
        <ItemActionButton
          title="Edit"
          className={styles.editBtn}
          type="edit"
          name = "edit"
          onActionClick={(e) => onEdit(e, vendor.id)}
        />
        <Link to={`${Routes.VENDOR}/${vendor.id}`} className={styles.detailsBtn}>View</Link>
      </div>
    </div>
  );
}

export default VendorListItem;
