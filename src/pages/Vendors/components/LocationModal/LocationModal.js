import { useState } from 'react';
import styles from './LocationModal.module.scss';
import AddLocation from '../AddLocation';
import CreateLocation from '../CreateLocation';
import AddNewItemButton from '../../../../components/AddNewItemButton';

function LocationModal({
  onModalClose,
  addLocationToVendor
}) {
  const [isCreateNewLocationOpen, setIsCreateNewLocationOpen] = useState(false);

  const toggleLocationHandler = () => {
    setIsCreateNewLocationOpen(!isCreateNewLocationOpen);
  };

  return (
    <div className={styles.locationContainer}>
      {!isCreateNewLocationOpen
        && <AddLocation onModalClose={onModalClose} addLocationToVendor={addLocationToVendor} />}
      {isCreateNewLocationOpen
        && < CreateLocation onModalClose={onModalClose} addLocationToVendor={addLocationToVendor}/>}
      <div className={styles.locationToggleBtnWrap}>
        <AddNewItemButton
          btnTitle={isCreateNewLocationOpen ? 'Add location from existed' : 'Create new location'}
          onAddNewItem={toggleLocationHandler}
          className={styles.AddBtnStyles}
          iconSize="default"
        />
      </div>
    </div>
  );
}

export default LocationModal;
