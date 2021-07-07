import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteForever from '@material-ui/icons/DeleteForever';
import styles from './AddVendor.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import AddNewItemButton from '../../../../components/AddNewItemButton';
import LocationModal from '../LocationModal';
import Modal from '../../../../components/Modal';
import * as actions from '../../../../store/actions';
import {
  idValidation,
  titleValidation,
  emailValidation,
  imageUrlValidation,
  companyDescriptionValidation,
  selectValidation
} from '../../../../utilities/validation';

const validate = {
  id: idValidation,
  title: titleValidation,
  email: emailValidation,
  imageUrl: imageUrlValidation,
  description: companyDescriptionValidation,
  location: selectValidation
};

function AddVendorModal({ onSave, selectedVendor }) {
  const dispatch = useDispatch();

  const [vendor, setVendor] = useState(selectedVendor);
  const [errors, setErrors] = useState({
    id: '',
    title: '',
    location: '',
    email: '',
    imageUrl: '',
    description: ''
  });
  const [touched, setTouched] = useState({ id: true });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [vendorLocations, setVendorLocations] = useState([
    {
      country: 'Ukraine',
      city: 'Vinnitsa',
      address: 'Porika 14',
      id: '11'
    }
  ]);

  const addVendorStatus = useSelector((state) => state.vendorReducer.addVendorStatus);
  // const initialLocation = citiesOptions.find((el) => el.id === vendor.location?.id);

  const onValueChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: ''
    }); // remove whatever error was there previously

    setIsDisabled(false);

    setVendor({
      ...vendor,
      [name]: value
    });

    setTouched({
      ...touched,
      [name]: true
    });
  };

  const onBlur = (e) => {
    const { name, value } = e.target;

    const error = validate[name](value);

    setErrors({
      ...errors,
      ...error && { [name]: touched[name] && error }
    });

    setIsDisabled(false);
  };

  const onSaveButtonClick = (e) => {
    e.preventDefault();

    const formValidation = Object.keys(vendor).reduce(
      (acc, key) => {
        const newError = validate[key](vendor[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...newError && { [key]: newError }
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );

    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    const existingErrors = Object.values(formValidation.errors).filter((error) => error !== '');
    const emptyFields = Object.values(formValidation.touched).filter((field) => field === '');

    if (
      existingErrors.length === 0 // no errors
      && emptyFields.length === 0 // no empty fields
      && Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      setIsDisabled(false);
      vendor.locationId = vendor.location.id;
      console.log(vendor);
      dispatch(actions.vendorActions.addVendor(vendor));
    } else {
      setIsDisabled(true);
    }
  };

  const onOkClick = () => {
    onSave();
    dispatch(actions.vendorActions.clearAddVendorStatus());
    dispatch(actions.vendorActions.applyVendorsFilters({ showMore: false, rewriteUrl: false }));
  };

  const openAddLocationModal = useCallback(() => {
    setIsLocationModalOpen(true);
  }, []);

  const closeAddLocationModal = useCallback(() => {
    setIsLocationModalOpen(false);
  }, []);

  const addLocationToVendor = (location) => {
    setVendorLocations([...vendorLocations, location]);
  };

  const deleteLocationHandler = (id) => {
    const filteredLocations = vendorLocations.filter((el) => el.id !== id);
    setVendorLocations(filteredLocations);
  };

  return (
    <div className = {`${styles.container} ${isLocationModalOpen ? styles.hidden : ''}`}>
      {addVendorStatus.loading === false && addVendorStatus.success
      && <div className = {styles.successMessageContainer}>
        <div className = {styles.successMessage}>{addVendorStatus.success}</div>
        <Button
          btnText = "OK"
          onClick = {onOkClick}
          type = "submit"
        />
      </div>}
      {addVendorStatus.loading === true
      && <div className = {styles.loadingContainer}>
        <CircularProgress />
      </div>}
      <form>
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Company name"
          label = "Company name"
          className={styles.inputContainer}
          name = "title"
          type = "text"
          value = {vendor.title}
          onBlur={onBlur}
          required
          touched = {touched.title}
          error = {errors.title}
        />
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Email"
          label = "Email"
          className={styles.inputContainer}
          name = "email"
          type="email"
          value = {vendor.email}
          onBlur={onBlur}
          required
          touched = {touched.email}
          error = {errors.email}
        />
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Image Url"
          label = "Image Url"
          name = "imageUrl"
          type = "url"
          className={styles.inputContainer}
          value = {vendor.imageUrl}
          onBlur={onBlur}
          required
          touched = {touched.imageUrl}
          error = {errors.imageUrl}
        />
        <div className={styles.locationBlock}>
          <div className={styles.locationsList}>
            {vendorLocations.map((el) => (
              <div className={styles.locationItem} key={el.id}>
                <p>{`${el.country}, ${el.city}, ${el.address}`}</p>
                <DeleteForever
                  className={styles.deleteBtn}
                  onClick={() => deleteLocationHandler(el.id)}
                />
              </div>
            ))}
          </div>
          <AddNewItemButton
            btnTitle="Add location"
            onAddNewItem={openAddLocationModal}
            className={styles.AddBtnStyles}
            iconSize="default"
          />
        </div>
        <textarea
          onChange = {onValueChange}
          className = {styles.description}
          placeholder = "Description"
          value = {vendor.description}
          name = "description"
          onBlur={onBlur}
          required
          touched = {touched.description ? 1 : 0}
        />
        <div className = {styles.error}>{errors.description}</div>
        {addVendorStatus.loading === false && addVendorStatus.error
        && <div className = {styles.errorMessage}>
          {addVendorStatus.error.message}
        </div>
        }
        <div className = {styles.buttonContainer}>
          <Button
            btnText = "Submit"
            onClick = {onSaveButtonClick}
            isDisabled = {isDisabled}
            type = "submit"
          />
        </div>
      </form>
      <Modal
        isOpen={isLocationModalOpen}
        onClose={closeAddLocationModal}
        isOverlayTransparent={isLocationModalOpen}
      >
        <LocationModal
          onModalClose={closeAddLocationModal}
          addLocationToVendor={addLocationToVendor}
        />
      </Modal>
    </div>
  );
}

export default AddVendorModal;
