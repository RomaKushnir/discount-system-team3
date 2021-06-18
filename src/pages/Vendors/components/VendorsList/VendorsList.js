import React from 'react';
import styles from './VendorsList.module.scss';
import VendorListItem from '../VendorListItem';

function VendorsList({ vendors, onEdit, onDelete }) {
  return (
    <div>
      {vendors.length
        ? vendors.map(
          (vendor) => <VendorListItem vendor={vendor} key={vendor.id} onEdit = {onEdit} onDelete = {onDelete}/>
        )
        : <p className={styles.noContentPlaceholder}>There are no vendors yet!</p>
      }
    </div>
  );
}

export default VendorsList;
