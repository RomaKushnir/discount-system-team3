import { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import styles from './AddVendor.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import AddNewItemButton from '../../../../components/AddNewItemButton';
import AddLocationModal from '../AddLocationModal';
import FileInput from '../../../../components/FileInput';
import Modal from '../../../../components/Modal';
import SUPPORTED_IMG_FORMATS from '../../../../utilities/supportedFormats';
import * as actions from '../../../../store/actions';

function AddVendorModal({ selectedVendor }) {
  const dispatch = useDispatch();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const addVendorStatus = useSelector((state) => state.vendorReducer.addVendorStatus);

  const validationSchema = useMemo(() => (yup.object().shape({
    title: yup.string().min(3, 'The field needs to be at least 3 characters').required('The field is required'),
    email: yup.string().email('Please, enter a valid email'),
    phoneNumber: yup.number().typeError('Field value should be a number').nullable(),
    imageUrl: yup.mixed().nullable().test('imageUrl', 'Wrong file type', (file) => {
      if (file && typeof file === 'object') {
        console.log('file yup', file.type);
        return SUPPORTED_IMG_FORMATS.includes(file.type);
      }
      return true;
    }),
    description: yup.string().min(3, 'The field needs to be at least 3 characters')
      .max(500, 'The field needs to be less then 500 characters').required('The field is required'),
    locations: yup.mixed().test('locations', 'At least one location is required', (val) => !val || val.length)
  })
  ), []);

  const isFormSubmitted = addVendorStatus.loading === false && addVendorStatus.success;

  let formikAccess = {};
  const getFormikAccess = (setFieldValue, values) => {
    formikAccess = { setFieldValue, values };
  };

  const openAddLocationModal = useCallback(() => {
    setIsLocationModalOpen(true);
  }, []);

  const closeAddLocationModal = useCallback(() => {
    setIsLocationModalOpen(false);
  }, []);

  const addLocationToVendor = (location) => {
    const { setFieldValue, values } = formikAccess;
    const updatedLocations = [...values.locations, ...location];
    setFieldValue('locations', updatedLocations);
  };

  const deleteLocationHandler = (id) => {
    const { setFieldValue, values } = formikAccess;
    const filteredLocations = values.locations.filter((el) => el.id !== id);
    setFieldValue('locations', filteredLocations);
  };

  const fileChangeHandler = (file) => formikAccess.setFieldValue('imageUrl', file);

  const onVendorSubmit = (formData) => {
    const { locations, ...dataRequest } = formData;
    dataRequest.locationIds = formData.locations.map((el) => el.id);
    dispatch(actions.vendorActions.addVendor(dataRequest));
  };

  return (
    <div className = {`${styles.container} ${isLocationModalOpen ? styles.hidden : ''}`}>
      {addVendorStatus.loading === true
      && <div className = {styles.loadingContainer}>
        <CircularProgress />
      </div>}
      <div className={isFormSubmitted ? styles.formDisplayNone : ''}>
        <Formik
          initialValues={selectedVendor}
          validationSchema={validationSchema}
          onSubmit={onVendorSubmit}
        >
          {(formikProps) => {
            const {
              handleBlur, handleChange, errors, values, setFieldValue, isValid, dirty
            } = formikProps;

            getFormikAccess(setFieldValue, values);// get setFieldValue at the component scope

            return (
              <Form>
                <TextInput
                  onValueChange = {handleChange}
                  placeholder = "Company name"
                  label = "Company name"
                  className={styles.inputContainer}
                  name = "title"
                  type = "text"
                  value = {values.title}
                  onBlur={handleBlur}
                  error = {errors.title}
                />
                <TextInput
                  onValueChange = {handleChange}
                  placeholder = "Email"
                  label = "Email"
                  className={styles.inputContainer}
                  name = "email"
                  type="email"
                  value = {values.email}
                  onBlur={handleBlur}
                  error = {errors.email}
                />
                <TextInput
                  onValueChange = {handleChange}
                  placeholder = "+380*********"
                  label = "Phone Number"
                  className={styles.inputContainer}
                  name = "phoneNumber"
                  type="text"
                  value = {values.phoneNumber}
                  onBlur={handleBlur}
                  error = {errors.phoneNumber}
                />
                <FileInput
                  image={values.imageUrl}
                  fileChangeHandler={fileChangeHandler}
                  name="imageUrl"
                />
                <div className={styles.locationBlock}>
                  <div className={styles.locationsList}>
                    <AddNewItemButton
                      btnTitle="Add location"
                      onAddNewItem={openAddLocationModal}
                      className={styles.AddBtnStyles}
                      iconSize="default"
                    />
                    {values.locations && <ul>
                      {values.locations.map((el) => (
                        <li className={styles.locationItem} key={el.id}>
                          <p>
                            {`${el.countryCode}${el.city ? `, ${el.city}` : ''}
                            ${el.addressLine ? `, ${el.addressLine}` : ''}`}
                          </p>
                          <DeleteForever
                            className={styles.deleteBtn}
                            onClick={() => deleteLocationHandler(el.id)}
                          />
                        </li>
                      ))}
                    </ul>}
                  </div>
                  {errors.locations && <p className = {styles.error}>{errors.locations}</p>}
                </div>
                <textarea
                  onChange = {handleChange}
                  className = {styles.description}
                  placeholder = "Description"
                  value = {values.description}
                  name = "description"
                  onBlur={handleBlur}
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
                    isDisabled = {!isValid || !dirty}
                    type = "submit"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Modal
        isOpen={isLocationModalOpen}
        onClose={closeAddLocationModal}
        isOverlayTransparent={isLocationModalOpen}
      >
        <AddLocationModal
          onModalClose={closeAddLocationModal}
          addLocationToVendor={addLocationToVendor}
        />
      </Modal>
    </div>
  );
}

export default AddVendorModal;
