import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from 'react-date-picker';
import styles from './AddDiscountModal.module.scss';
import TextInput from '../../../../components/TextInput';
import SelectField from '../../../../components/SelectField';
import Button from '../../../../components/Button';
import * as actions from '../../../../store/actions';
import {
  getVendorsOptions,
  getCountriesOptions,
  getCitiesGroupedByCountryOptions
} from '../../../../store/selectors';
import * as validation from '../../../../utilities/validation';

function AddDiscountModal({
  discount,
  onModalClose
}) {
  console.log(discount);
  const dispatch = useDispatch();
  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesGroupedByCountryOptions);
  const vendorsOptions = useSelector(getVendorsOptions);
  const createDiscountStatus = useSelector((state) => state.discountsReducer.createDiscountStatus);
  const [startDate, setStartDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);

  console.log('createDiscountStatus', createDiscountStatus);

  // GET REQUIRED DATA FROM API
  useEffect(() => {
    if (!countriesOptions.length || !citiesOptions.length) {
      dispatch(actions.locationActions.getLocationsList());
    }
    if (!vendorsOptions.length) dispatch(actions.vendorActions.getVendors());
    // dispatch(actions.categoryActions.getAllCategories());// should be add in actions
  }, [dispatch, countriesOptions, citiesOptions, vendorsOptions]);

  // FORM PROCESS
  const [discountData, setDiscountData] = useState({
    title: { value: '', isTouched: false, error: '' },
    imageUrl: { value: '', isTouched: false, error: '' },
    description: { value: '', isTouched: false, error: '' },
    shortDescription: { value: '', isTouched: false, error: '' },
    discountFlat: { value: '', isTouched: true, error: '' },
    discountPercentage: { value: '', isTouched: true, error: '' },
    // country: { value: '', isTouched: false, error: '' },
    // city: { value: '', isTouched: false, error: '' },
    vendor: { value: '', isTouched: false, error: '' },
    // category: { value: '', isTouched: false, error: '' },
    // tags: { value: '', isTouched: false, error: '' },
    startDate: { value: '', isTouched: false, error: '' },
    expirationDate: { value: '', isTouched: false, error: '' }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e);
    // console.log('discountData before', discountData[name]);
    setDiscountData({
      ...discountData,
      [name]: {
        value,
        isTouched: true,
        error: validation.inputValidate(name, value)
      }
    });
    setIsSubmitEnabled(true);
    console.log('discountData input change', name, discountData[name]);
  };

  const handleSelectChange = (selected, options) => {
    const { name } = options;
    const value = selected && (selected.value || selected.length) ? selected.value : '';
    // console.log('value', value, 'name', name);
    // console.log('selected', selected, 'options', options);
    setDiscountData({
      ...discountData,
      [name]: {
        value,
        isTouched: true,
        error: validation.selectValidation(value)
      }
    });
    setIsSubmitEnabled(true);
  };

  const handleDatePickFrom = (val) => {
    console.log('datepicker start', val);
    setStartDate(val);
    setDiscountData({
      ...discountData,
      startDate: {
        val,
        isTouched: true,
        error: validation.requiredValidate(val)
      }
    });
    setIsSubmitEnabled(true);
  };
  const handleDatePickTo = (val) => {
    console.log('datepicker expiration', val);
    setExpirationDate(val);
    setDiscountData({
      ...discountData,
      expirationDate: {
        val,
        isTouched: true,
        error: validation.requiredValidate(val)
      }
    });
    setIsSubmitEnabled(true);
  };

  const handleFormValidate = () => {
    console.log('discountData', discountData);
    const errorsFree = Object.keys(discountData).every((el) => !discountData[el].error);
    console.log('errorsFree', errorsFree);
    // console.log('isSubmitEnabled before set', isSubmitEnabled);
    if (errorsFree === true) {
      console.log('isSubmitEnabled', isSubmitEnabled);
      setIsSubmitEnabled(true);
    } else {
      console.log('isSubmitEnabled', isSubmitEnabled);
      setIsSubmitEnabled(false);
    }
    // console.log('isSubmitEnabled after set', isSubmitEnabled);
  };

  console.log('isSubmitEnabled', isSubmitEnabled);
  const handleErrors = () => {
    const formInputs = Object.keys(discountData);
    const inputsError = discountData;
    formInputs.forEach((inputName) => {
      if (discountData[inputName].isTouched === false) {
        if (
          discountData[inputName].title !== 'country'
          || discountData[inputName].title !== 'city'
          || discountData[inputName].title !== 'tags'
          || discountData[inputName].title !== 'discountPercentage'
          || discountData[inputName].title !== 'discountFlat'
        ) {
          // console.log(inputsError[inputName].title);
          inputsError[inputName].error = validation.requiredValidate();
        }
      }
      setDiscountData({
        ...discountData,
        ...inputsError
      });
    });
  };

  // FORM SUBMIT
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {};
    formData.title = discountData.title.value;
    formData.imageUrl = discountData.imageUrl.value;
    formData.description = discountData.description.value;
    formData.shortDescription = discountData.shortDescription.value;
    formData.flatAmount = discountData.discountFlat.value === '' ? 1 : discountData.discountFlat.value;
    formData.percentage = discountData.discountPercentage.value === ''
      ? 1 : discountData.discountPercentage.value;
    formData.startDate = startDate;
    formData.expirationDate = expirationDate;
    formData.vendorId = discountData.vendor.value;
    // fake data
    formData.categoryId = 3;
    formData.perUser = 1;
    formData.price = 0;
    formData.quantity = 1;

    handleErrors();
    handleFormValidate();

    console.log('isSubmitEnabled submit', isSubmitEnabled);
    const errorsFree = Object.keys(discountData).every((el) => !discountData[el].error);
    console.log('errors free', errorsFree);

    if (errorsFree) {
      console.log('formData', formData);
      dispatch(actions.discountsActions.createDiscount(formData));
    }

    // setIsSubmitEnabled(true);
    // console.log('formData submit', formData);
    // onModalClose();
  };

  const onOkClick = () => {
    onModalClose();
    dispatch(actions.discountsActions.clearCreateDiscountStatus());
    dispatch(actions.discountsActions.getDiscountsList());
  };

  return (
    <div className={styles.modalContent}>
      {createDiscountStatus.loading === false && createDiscountStatus.success
      && <div className = {styles.successMessageContainer}>
        <div className = {styles.successMessage}>{createDiscountStatus.success}</div>
        <Button
          btnText = "OK"
          onClick = {onOkClick}
          type = "submit"
        />
      </div>}
      {createDiscountStatus.loading === true
      && <div className = {styles.loadingContainer}>
        <CircularProgress />
      </div>}
      <form onSubmit={submitHandler}>
        <TextInput
          onValueChange = {handleInputChange}
          placeholder = "Discount title"
          label = "Title"
          name = "title"
          className={styles.inputContainer}
          type = "text"
          value = {discountData.title.value}
          // onBlur={handleInputError}
          // required
          // touched = {touched.title}
          error = {discountData.title.error}
        />
        <div className={styles.locationSection}>
          <div className={styles.twoColumnsWrapper}>
            {/* <SelectField
              options = {countriesOptions}
              // initialValue = {transformedInitialLocation}
              label = "Country"
              name = "country"
              className={styles.inputContainer}
              onChange = {handleSelectChange}
              error = {discountData.country.error}
            /> */}
          </div>
          {/* <SelectField
            options = {citiesOptions}
            // initialValue = {transformedInitialLocation}
            label = "City"
            name = "city"
            className={styles.inputContainer}
            isMulti={true}
            onChange = {handleSelectChange}
            error = {discountData.city.error}
          /> */}
        </div>
        <div className={styles.twoColumnsWrapper}>
          <SelectField
            options = {vendorsOptions}
            // initialValue = {transformedInitialLocation}
            label = "Vendor"
            name = "vendor"
            placeholder = "Select vendor"
            className={styles.inputContainer}
            onChange = {handleSelectChange}
            error = {discountData.vendor.error}
          />
          {/* <SelectField
            // options = {citiesOptions}
            // initialValue = {transformedInitialLocation}
            label = "Category"
            name = "category"
            placeholder = "Select category"
            className={styles.inputContainer}
            onChange = {handleSelectChange}
            error = {discountData.category.error}
          /> */}
        </div>
        {/* <SelectField
          // options = {citiesOptions}
          // initialValue = {transformedInitialLocation}
          label = "Tags"
          name = "tags"
          placeholder = "Select tag"
          className={styles.inputContainer}
          isMulti={true}
          onChange = {handleSelectChange}
          error = {discountData.tags.error}
        /> */}
        <TextInput
          onValueChange = {handleInputChange}
          placeholder = "Image Url"
          label = "Image Url"
          name = "imageUrl"
          type = "url"
          className={styles.inputContainer}
          value = {discountData.imageUrl.value}
          // onBlur={onBlur}
          // required
          // touched = {touched.imageUrl}
          error = {discountData.imageUrl.error}
        />
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="description">Full Description</label>
          <textarea
            onChange = {handleInputChange}
            placeholder = "Full Description"
            value = {discountData.description.value}
            id="description"
            name = "description"
            // onBlur={onBlur}
            // required
            // touched = {touched.description ? 1 : 0}
          />
          <div className = {styles.error}>{discountData.description.error}</div>
        </div>
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            onChange = {handleInputChange}
            placeholder = "Short Description"
            value = {discountData.shortDescription.value}
            className={styles.shortDescr}
            id = "shortDescription"
            name = "shortDescription"
            // onBlur={onBlur}
            // required
            // touched = {touched.description ? 1 : 0}
          />
          <div className = {styles.error}>{discountData.shortDescription.error}</div>
        </div>
        <div className={`${styles.discountDateSection} ${styles.twoColumnsWrapper}`}>
          <div className={styles.discountContainer}>
            <TextInput
              onValueChange = {handleInputChange}
              placeholder = "Discount flat"
              label = "Discount flat"
              name = "discountFlat"
              className={styles.inputContainer}
              type = "text"
              value = {discountData.discountFlat.value}
              // onBlur={onBlur}
              // required
              // touched = {touched.title}
              // error = {discountData.discountFlat.error}
            />
            <TextInput
              onValueChange = {handleInputChange}
              placeholder = "Discount %"
              label = "Discount %"
              name = "discountPercentage"
              className={styles.inputContainer}
              type = "text"
              value = {discountData.discountPercentage.value}
              // onBlur={onBlur}
              // required
              // touched = {touched.title}
              // error = {discountData.discountPercentage.error}
            />
            {(discountData.discountFlat.error || discountData.discountPercentage.error)
            && <div className = {styles.error}>
              {discountData.discountFlat.error && discountData.discountPercentage.error}
              </div>}
          </div>
          <div className={styles.dateContainer}>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>From</label>
              <DatePicker
                format="dd-MM-y"
                name="startDate"
                className={styles.customDatePicker}
                value={startDate}
                onChange={handleDatePickFrom}
                returnValue="start"
              />
            </div>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>To</label>
              <DatePicker
                format="dd-MM-y"
                name="expirationDate"
                className={styles.customDatePicker}
                value={expirationDate}
                onChange={handleDatePickTo}
                returnValue="end"
              />
            </div>
            {(discountData.startDate.error || discountData.expirationDate.error)
            && <div className = {styles.error}>{validation.requiredValidate('')}</div>}
          </div>
        </div >
        {createDiscountStatus.loading === false && createDiscountStatus.error
          && <div className = {styles.errorMessage}>
          {createDiscountStatus.error.message}
        </div>}
        <div className={styles.btnContainer}>
          <Button
            btnText = "Save"
            isDisabled = {!isSubmitEnabled}
            type = "submit"
          />
        </div>
      </form>
    </div>
  );
}

export default AddDiscountModal;
