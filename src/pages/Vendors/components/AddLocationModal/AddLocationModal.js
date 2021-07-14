import { useEffect, useMemo } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import styles from './AddLocationModal.module.scss';
import SelectField from '../../../../components/SelectField';
import CreatableSelectField from '../../../../components/CreatableSelectField';
import Button from '../../../../components/Button';
import { getCountriesOptions, getCitiesOptions, getLocationsOptions } from '../../../../store/selectors';
import * as actions from '../../../../store/actions';

function LocationModal({
  onModalClose,
  addLocationToVendor
}) {
  const initialFormData = useMemo(() => ({
    countryCode: { value: '', label: '' },
    city: { value: '', label: '' },
    addressLine: { value: '', label: '' }
  }), []);
  const validationSchema = useMemo(() => (
    yup.object().shape({
      countryCode: yup.object().nullable().test('countryCode', 'The fiels is required',
        (obj) => (obj && obj?.value))
    })
  ), []);

  const dispatch = useDispatch();
  const createdLocation = useSelector((state) => state.locationReducer.createdLocation);
  const createLocationStatus = useSelector((state) => state.locationReducer.createLocationStatus);
  const countriesOptionsAPI = useSelector(getCountriesOptions);
  const citiesOptionsAPI = useSelector(getCitiesOptions);
  const locationsOptionsAPI = useSelector(getLocationsOptions);

  const createOnSelectValueChange = (setFieldValue, resetForm) => (selected, options) => {
    const { name } = options;
    const value = selected && selected.value;
    if (name === 'countryCode') {
      dispatch(actions.locationActions.getCities(value));
      resetForm();
      dispatch(actions.locationActions.clearLocationsData());// clear addressLine options
    }
    if (name === 'city') {
      dispatch(actions.locationActions.getLocationsList(value));
      setFieldValue('addressLine', { value: '', label: '' });
    }
    setFieldValue(name, selected);
  };

  useEffect(() => {
    if (createLocationStatus.success) {
      addLocationToVendor([createdLocation]);
      dispatch(actions.locationActions.clearCreateLocationStatus());
      onModalClose();
    }
    return () => {
      dispatch(actions.locationActions.clearCreateLocationStatus());
    };
  // eslint-disable-next-line
  }, [createLocationStatus.success, createdLocation]);

  const onAddLocation = (formData) => {
    console.log('onAddLocation values', formData);
    const createLocationdata = {
      countryCode: formData.countryCode.value,
      city: formData.city.value,
      addressLine: formData.addressLine.value
    };
    if (formData.addressLine && typeof formData.addressLine.value === 'object') {
      const existedLocation = formData.addressLine.value;
      addLocationToVendor([existedLocation]);
      onModalClose();
    } else {
      dispatch(actions.locationActions.createLocation(createLocationdata));
    }
  };

  return (
    <div className={styles.addLocationContainer}>
      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        onSubmit={onAddLocation}
      >
        {(formikProps) => {
          const {
            handleBlur, setFieldValue, resetForm, values, errors, isValid, dirty
          } = formikProps;
          // console.log('formdata values', values);
          return (
            <Form className={styles.createLocationForm}>
              <div className={styles.twoColumnsWrapper}>
                <SelectField
                  options = {countriesOptionsAPI}
                  name="countryCode"
                  label = "Country"
                  placeholder = "Country"
                  className={styles.inputContainer}
                  onChange = {createOnSelectValueChange(setFieldValue, resetForm)}
                  value={values.countryCode?.value ? values.countryCode : null}
                  onBlur = {handleBlur}
                  isSearchable= {true}
                  isClearable= {false}
                  error = {errors.countryCode}
                />
                <CreatableSelectField
                  options = {citiesOptionsAPI}
                  name="city"
                  label="City"
                  placeholder="City"
                  className={styles.inputContainer}
                  onChange={createOnSelectValueChange(setFieldValue, resetForm)}
                  // value={citiesOptionsAPI.find((el) => el.value === values.city) || null}
                  value={values.city?.value ? values.city : null}
                  onBlur={handleBlur}
                  isSearchable={true}
                />
              </div>
              <CreatableSelectField
                options = {locationsOptionsAPI}
                name="addressLine"
                label="Address line"
                placeholder="Address line"
                className={styles.inputContainer}
                onChange={createOnSelectValueChange(setFieldValue, resetForm)}
                // value={locationsOptionsAPI.find((el) => el.value === values.addressLine) || null}
                value={values.addressLine?.value ? values.addressLine : null}
                onBlur={handleBlur}
                isSearchable={true}
                isClearable={true}
              />
              {createLocationStatus.error && <p>{createLocationStatus.error.message}</p>}
              <Button
                btnText = "Add location"
                isDisabled = {!isValid || !dirty}
                className={styles.addLocationBtn}
                type = "submit"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LocationModal;
