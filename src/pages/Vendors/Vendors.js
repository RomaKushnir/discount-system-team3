import {
  useCallback,
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import sortList from '../../utilities/sortOptions';
import Pagination from '../../components/Pagination/Pagination';
import {
  getVendorsOptions,
  getCountriesOptions,
  getVendorsList,
  getCitiesOptions,
  getCategoriesOptions
} from '../../store/selectors';

function Vendors() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    dispatch(actions.vendorActions.getVendors());
    dispatch(actions.locationActions.getLocationsList());
    dispatch(actions.categoryActions.getCategories());
  }, [dispatch]);

  const vendors = useSelector(getVendorsList);
  const vendorsOptions = useSelector(getVendorsOptions);
  const countriesOptions = useSelector(getCountriesOptions);
  const getVendorsStatus = useSelector((state) => state.vendorReducer.getVendorsStatus);
  const citiesOptions = useSelector(getCitiesOptions);
  const categoriesOptions = useSelector(getCategoriesOptions);

  const onModalOpen = useCallback((e, id) => {
    setIsOpen(true);
    dispatch(actions.locationActions.getLocationsList());

    if (e.target.name === 'edit') {
      const selectedVendor = vendors.find((el) => el.id === id);

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
  }, [dispatch, vendors]);

  const onDelete = useCallback((id) => {
    dispatch(actions.vendorActions.clearDeleteVendorStatus());
    dispatch(actions.vendorActions.deleteVendor(id));
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onApplyButtonClick = () => {
    // apply filters
  };

  const onSortFilter = (selectedOption) => {
    console.log(selectedOption);
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
            countriesList={countriesOptions}
            citiesList={citiesOptions}
            categoriesList={categoriesOptions}
            vendorsList={vendorsOptions}
          />
          <div className={styles.vendorsActionsBlock}>
            <AddNewItemButton
              btnTitle="Add new vendor"
              onAddNewItem={onModalOpen}
              name = "add"
            />
            <SelectField
              initialValue={sortList[0]}
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
            <div>
              {getVendorsStatus.loading === true
                && <div className = {styles.loadingContainer}>
                <CircularProgress />
              </div>}
              {getVendorsStatus.loading === false
                && <>
                <VendorsList
                  vendors={vendors}
                  onEdit = {onModalOpen}
                  onDelete = {onDelete}
                />
                <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />
                </>
                }
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Vendors;
