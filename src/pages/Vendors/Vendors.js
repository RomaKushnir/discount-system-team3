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
import { vendorsSortOptions } from '../../utilities/sortOptions';
import Pagination from '../../components/Pagination/Pagination';
import {
  getVendorsOptions,
  getCountriesOptions,
  getVendorsList,
  getCitiesOptions
  // getCategoriesOptions
} from '../../store/selectors';
import history from '../../history';
import useVendorsQueryChecker from '../../utilities/useVendorsQueryChecker';

function Vendors() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState(null);
  const vendors = useSelector(getVendorsList);
  const vendorsOptions = useSelector(getVendorsOptions);
  const countriesOptions = useSelector(getCountriesOptions);
  const getVendorsStatus = useSelector((state) => state.vendorReducer.getVendorsStatus);
  const citiesOptions = useSelector(getCitiesOptions);
  const vendorsFiltersApplied = useSelector((state) => state.vendorReducer.vendorsFiltersApplied);
  const vendorsFilters = useSelector((state) => state.vendorReducer.vendorsFilters);

  useEffect(() => {
    // const showMore = false;
    // dispatch(actions.vendorActions.clearGetVendorsStatus());
    // dispatch(actions.vendorActions.applyVendorsFilters(showMore));
    dispatch(actions.locationActions.getLocationsList());
    dispatch(actions.categoryActions.getCategories());
  }, [dispatch]);

  console.log(history.location.search);

  useVendorsQueryChecker(history.location.search);

  // const categoriesOptions = useSelector(getCategoriesOptions);

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
        location: null,
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

  const onChangeCountry = (selectedCountry) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ country: selectedCountry?.label || null }));
  };

  const onChangeCity = (city) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ city: city?.label || null }));
  };

  const onChangeCategory = (category) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ categoryId: category?.id || null }));
  };

  const onSearchVendor = (selectedVendor) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ title: selectedVendor }));
  };

  const onSearchInputChange = (descriptionSearchWord) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ description: descriptionSearchWord }));
  };

  const onSortFilterChange = (selectedOption) => {
    console.log(selectedOption);
    dispatch(actions.vendorActions.updateVendorsFilters({ sort: selectedOption?.value || null }));
  };

  const onApplyButtonClick = () => {
    const showMore = false;

    dispatch(actions.vendorActions.clearGetVendorsStatus());
    dispatch(actions.vendorActions.applyVendorsFilters(showMore));
  };

  const onShowMoreClick = () => {
    if (vendorsFiltersApplied.pageNumber < vendorsFiltersApplied.totalPages) {
      const showMore = true;
      dispatch(actions.vendorActions.updateVendorsFilters({ pageNumber: vendorsFilters.pageNumber += 1 }));
      dispatch(actions.vendorActions.applyVendorsFilters(showMore));
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <main className={styles.contentWrapper}>
          <FiltersContainer
            onApplyButtonClick={onApplyButtonClick}
            onChangeCountry = {onChangeCountry}
            onChangeCity = {onChangeCity}
            onChangeCategory = {onChangeCategory}
            onSearchVendor = {onSearchVendor}
            onSearchInputChange = {onSearchInputChange}
            countriesList={countriesOptions}
            citiesList={citiesOptions}
            // categoriesList={categoriesOptions}
            vendorsList={vendorsOptions}
            filters = {vendorsFilters}
          />
          <div className={styles.vendorsActionsBlock}>
            <AddNewItemButton
              btnTitle="Add new vendor"
              onAddNewItem={onModalOpen}
              name = "add"
            />
            <SelectField
              initialValue={vendorsSortOptions[0]}
              options={vendorsSortOptions}
              onChange={onSortFilterChange}
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
                {vendorsFiltersApplied.pageNumber + 1 < vendorsFiltersApplied.totalPages
                  && <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />}
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
