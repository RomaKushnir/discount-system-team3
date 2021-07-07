import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import styles from './CreateLocation.module.scss';
import TextInput from '../../../../components/TextInput';
import SelectField from '../../../../components/SelectField';
import Button from '../../../../components/Button';
import { getCitiesOptions } from '../../../../store/selectors';
import * as actions from '../../../../store/actions';

const CreateLocation = ({ addLocationToVendor, onModalClose }) => {
  const dispatch = useDispatch();
  const citiesOptions = useSelector(getCitiesOptions);
  const createdLocation = useSelector((state) => state.locationReducer.locationsList);
  const createLocationStatus = useSelector((state) => state.locationReducer.createLocationStatus);

  useEffect(() => {
    if (createLocationStatus.success) {
      addLocationToVendor(createdLocation);
      dispatch(actions.locationActions.clearCreateLocationStatus());
      onModalClose();
      // console.log('created location success', createdLocation);
    }
    return () => {
      dispatch(actions.locationActions.clearCreateLocationStatus());
    };
  }, [createLocationStatus.success, createdLocation, onModalClose, addLocationToVendor, dispatch]);

  return (
    <div className={styles.createLocationWrapper}>
      <Formik
        initialValues={{
          country: '',
          city: '',
          address: ''
        }}
        validationSchema={yup.object().shape({
          country: yup.string().nullable().required('The fiels is required')
        })}
      >
        {(formikProps) => {
          const {
            handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, isValid, dirty, isSubmitting
          } = formikProps;

          const onSelectValueChange = (selected, options) => {
            const { name } = options;
            const value = selected && selected.value;
            setFieldValue(name, value);
          };

          const onCreateLocation = () => {
            console.log('onCreateLocation values', values, isValid, dirty);
            handleSubmit();
            dispatch(actions.locationActions.createLocation(values));
          };
          return (
            <Form className={styles.createLocationForm}>
              <div className={styles.twoColumnsWrapper}>
                <SelectField
                  // defaultValue={citiesOptions}
                  options = {citiesOptions}
                  name="country"
                  label = "Country"
                  placeholder = "Country"
                  className={styles.inputContainer}
                  onChange = {onSelectValueChange}
                  onBlur = {handleBlur}
                  error = {errors.country}
                />
                <TextInput
                  onValueChange = {handleChange}
                  placeholder = "City"
                  label = "City"
                  className={styles.inputContainer}
                  name = "city"
                  type = "text"
                  value = {values.city}
                />
              </div>
              <TextInput
                onValueChange = {handleChange}
                placeholder = "Address line"
                label = "Address line"
                className={styles.inputContainer}
                name = "address"
                type = "text"
                value = {values.address}
              />
              {createLocationStatus.error && <p>{createLocationStatus.error.message}</p>}
              <Button
                btnText = "Create location"
                onClick = {onCreateLocation}
                isDisabled = {!isValid || !dirty || isSubmitting}
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
