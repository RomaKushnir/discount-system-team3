import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Vendors.module.scss';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import AddVendor from './components/AddVendor/AddVendor';
import * as actions from '../../store/actions';

const selectedVendor = {
  title: 'Rozetka',
  countryId: 1,
  cityId: 2,
  email: 'test@rozetka.com',
  imageUrl: 'https://i.picsum.photos/id/548/200/200.jpg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
};

function Vendors() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState(null);

  const currentUserCountryId = 1; // temporary

  const onModalOpen = (e) => {
    setIsOpen(true);
    dispatch(actions.locationActions.getCountriesList());
    dispatch(actions.locationActions.getSelectedCitiesList(currentUserCountryId));

    if (e.target.name === 'edit') {
      setVendor(selectedVendor);
    } else {
      setVendor({
        title: '',
        countryId: currentUserCountryId,
        cityId: null,
        email: '',
        imageUrl: '',
        description: ''
      });
    }
  };

  return (
    <div>
      <div className = {styles.container}>Vendors page</div>
      <Button
        btnText = "Add"
        onClick = {onModalOpen}
        name = "add"
      />
      <Button
        btnText = "Edit"
        onClick = {onModalOpen}
        name = "edit"
      />
      <Modal
        isOpen = {isOpen}
        onClose = {() => setIsOpen(false)}
      >
        <AddVendor
          onSave = {() => setIsOpen(false)}
          selectedVendor = {vendor}
        />
      </Modal>
    </div>
  );
}

export default Vendors;
