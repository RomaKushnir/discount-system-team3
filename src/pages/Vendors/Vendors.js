import React, { useState } from 'react';
import styles from './Vendors.module.scss';
import Modal from '../../components/Modal';
import AddVendor from './components/AddVendor/AddVendor';
import VendorsList from './components/VendorsList';
import AddNewItemButton from '../../components/AddNewItemButton';

function Vendors() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className = {styles.container}>Vendors page</div>
      <AddNewItemButton
        btnTitle="Add new vendor"
        onAddNewItem={() => setIsOpen(true)}
      />
      <Modal
        isOpen = {isOpen}
        onClose = {() => setIsOpen(false)}
      >
        <AddVendor />
      </Modal>
      <VendorsList />
    </div>
  );
}

export default Vendors;
