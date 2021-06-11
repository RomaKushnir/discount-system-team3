import React, { useState } from 'react';
import styles from './Vendors.module.scss';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import AddVendor from './components/AddVendor/AddVendor';

function Vendors() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className = {styles.container}>Vendors page</div>
      <Button
        btnText = "Add"
        onClick = {() => setIsOpen(true)}
      />
      <Modal
        isOpen = {isOpen}
        onClose = {() => setIsOpen(false)}
      >
        <AddVendor />
      </Modal>
    </div>
  );
}

export default Vendors;
