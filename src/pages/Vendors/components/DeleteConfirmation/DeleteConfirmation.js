import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './DeleteConfirmation.module.scss';
import Button from '../../../../components/Button';

function DeleteConfirmation({ onYesClick }) {
  const deleteVendorStatus = useSelector((state) => state.vendorReducer.deleteVendorStatus);
  console.log(deleteVendorStatus);
  return (
    <div className = {styles.container}>
      <div className = {styles.question}>Are you sure you want to delete this vendor?</div>
      {deleteVendorStatus.loading === false && deleteVendorStatus.error
        && <div className = {styles.errorMessage}>
          {deleteVendorStatus.error.message}
      </div>
      }
        <Button
          btnText = "Yes"
          onClick = {onYesClick}
          type = "submit"
        />
      {deleteVendorStatus.loading === true
        && <div className = {styles.loadingContainer}>
          <CircularProgress />
      </div>}
    </div>
  );
}

export default DeleteConfirmation;
