import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Vendors.module.scss';
import Modal from '../../components/Modal';
import AddVendorModal from './components/AddVendor';
import VendorsList from './components/VendorsList';
import * as actions from '../../store/actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FiltersContainer from '../../components/FiltersContainer';
import AddNewItemButton from '../../components/AddNewItemButton';
import SelectField from '../../components/SelectField';
import sortList from '../../mockData/sortList';// mock data to render select list
import VendorsListPage from '../../mockData/VendorsListPage';// mock data to render select list
import countriesList from '../../mockData/countriesList';// mock data to render select list
import citiesList from '../../mockData/citiesList';// mock data to render select list
import vendorsList from '../../mockData/vendorsList';// mock data to render select list
import Pagination from '../../components/Pagination/Pagination';

function Vendors() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState(null);

  const onModalOpen = (e, id) => {
    setIsOpen(true);
    dispatch(actions.locationActions.getLocationsList());

    console.log(e, id);

    if (e.target.name === 'edit') {
      const selectedVendor = VendorsListPage.find((el) => el.id === id);

      setVendor(selectedVendor);
    } else {
      setVendor({
        id: '',
        title: '',
        locationId: null,
        email: '',
        imageUrl: '',
        description: ''
      });
    }
  };

  const onDelete = (id) => {
    // do code to delete item
    console.log(id);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onApplyButtonClick = () => {
    // apply filters
  };

  const onSortFilter = () => {
    // apply sort filter
  };

  const onShowMoreClick = () => {
    // do request to get more items
  };

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <main className={styles.contentWrapper}>
          <FiltersContainer
            onApplyButtonClick={onApplyButtonClick}
            countriesList={countriesList}
            citiesList={citiesList}
            categoriesList={[]}
            vendorsList={vendorsList}
          />
          <div className={styles.vendorsActionsBlock}>
            <AddNewItemButton
              btnTitle="Add new vendor"
              onAddNewItem={onModalOpen}
              name = "add"
            />
            <SelectField
              initialValue={[sortList[0]]}
              options={sortList}
              onChange={onSortFilter}
              isClearable={false}
              />
          </div>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <AddVendorModal
              onSave={closeModal}
              selectedVendor = {vendor}
            />
          </Modal>
          <VendorsList
            vendors={VendorsListPage}
            onEdit = {onModalOpen}
            onDelete = {onDelete}
          />
          <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Vendors;
