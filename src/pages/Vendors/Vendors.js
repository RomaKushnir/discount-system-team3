import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Vendors.module.scss';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import AddVendor from './components/AddVendor/AddVendor';
import * as actions from '../../store/actions';

function Vendors() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const currentUserCountryId = 1; // temporary

  const onModalOpen = () => {
    setIsOpen(true);
    dispatch(actions.locationActions.getCountriesList());
    dispatch(actions.locationActions.getSelectedCitiesList(currentUserCountryId));
  };

  return (
    <div>
      <div className = {styles.container}>Vendors page</div>
      <Button
        btnText = "Add"
        onClick = {onModalOpen}
      />
      <Modal
        isOpen = {isOpen}
        onClose = {() => setIsOpen(false)}
      >
      <AddVendor onSave = {() => setIsOpen(false)}/>
      </Modal>
    </div>
  );
}

export default Vendors;
