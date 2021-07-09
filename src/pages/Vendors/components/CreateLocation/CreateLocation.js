import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import styles from './CreateLocation.module.scss';
import TextInput from '../../../../components/TextInput';
import SelectField from '../../../../components/SelectField';
import CreatableSelectField from '../../../../components/CreatableSelectField';
import Button from '../../../../components/Button';
import { getCountriesOptions, getCitiesOptions } from '../../../../store/selectors';
import * as actions from '../../../../store/actions';

const CreateLocation = ({ addLocationToVendor, onModalClose }) => {
  const dispatch = useDispatch();
  const createdLocation = useSelector((state) => state.locationReducer.createdLocation);
  const createLocationStatus = useSelector((state) => state.locationReducer.createLocationStatus);
  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesOptions);

  const createOnSelectValueChange = (setFieldValue) => (selected, options) => {
    const { name } = options;
    const value = selected && selected.value;
    setFieldValue(name, value);
    if (name === 'countryCode') {
      dispatch(actions.locationActions.getCities(value));
    }
  };

  useEffect(() => {
    if (createLocationStatus.success) {
      console.log('created location success', createdLocation);
      addLocationToVendor([createdLocation]);
      dispatch(actions.locationActions.clearCreateLocationStatus());
      onModalClose();
    }
    return () => {
      dispatch(actions.locationActions.clearCreateLocationStatus());
    };
  }, [createLocationStatus.success, createdLocation, onModalClose, addLocationToVendor, dispatch]);

  return (
    <div className={styles.createLocationWrapper}>
      <Formik
        initialValues={{
          countryCode: '',
          city: '',
          addressLine: ''
        }}
        validationSchema={yup.object().shape({
          countryCode: yup.string().nullable().required('The fiels is required')
        })}
      >
        {(formikProps) => {
          const {
            handleSubmit, handleChange, handleBlur, setFieldValue, values, errors
            //  isValid, dirty, isSubmitting
          } = formikProps;

          const onCreateLocation = () => {
            // console.log('onCreateLocation values', values, isValid, dirty);
            handleSubmit();
            dispatch(actions.locationActions.createLocation(values));
          };
          return (
            <Form className={styles.createLocationForm}>
              <div className={styles.twoColumnsWrapper}>
                <SelectField
                  options = {countriesOptions}
                  name="countryCode"
                  label = "Country"
                  placeholder = "Country"
                  className={styles.inputContainer}
                  onChange = {createOnSelectValueChange(setFieldValue)}
                  onBlur = {handleBlur}
                  isSearchable={true}
                  error = {errors.country}
                />
                <CreatableSelectField
                  options = {citiesOptions}
                  name="city"
                  label="City"
                  placeholder="City"
                  className={styles.inputContainer}
                  onChange={createOnSelectValueChange(setFieldValue)}
                  onBlur={handleBlur}
                  isSearchable={true}
                  isClearable={true}
                />
              </div>
              <TextInput
                onValueChange = {handleChange}
                placeholder = "Address line"
                label = "Address line"
                className={styles.inputContainer}
                name = "addressLine"
                type = "text"
                value = {values.address}
              />
              {createLocationStatus.error && <p>{createLocationStatus.error.message}</p>}
              <Button
                btnText = "Create location"
                onClick = {onCreateLocation}
                // isDisabled = {!isValid || !dirty || isSubmitting}
                className={styles.createLocationBtn}
                type = "submit"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateLocation;
