import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from 'react-date-picker';
import { useFormik } from 'formik';
import validationSchema from '../../../../utilities/validationSchema';
import styles from './CreateDiscount.module.scss';
import TextInput from '../../../../components/TextInput';
import SelectField from '../../../../components/SelectField';
import Button from '../../../../components/Button';
import * as actions from '../../../../store/actions';
import {
  getVendorsOptions,
  getCountriesOptions,
  getCitiesGroupedByCountryOptions,
  getCategoriesOptions
} from '../../../../store/selectors';

function CreateDiscount({
  discount = {
    title: '',
    imageUrl: '',
    description: '',
    shortDescription: '',
    flatAmount: '',
    percentage: '',
    startDate: new Date(Date.now()),
    expirationDate: null,
    vendorId: null,
    // mocked fields
    categoryId: 2,
    perUser: 1,
    price: 0,
    quantity: 1
  },
  onModalClose
}) {
  const dispatch = useDispatch();
  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesGroupedByCountryOptions);
  const vendorsOptions = useSelector(getVendorsOptions);
  const categoriesOptions = useSelector(getCategoriesOptions);
  const createDiscountStatus = useSelector((state) => state.discountsReducer.createDiscountStatus);

  console.log('createDiscountStatus', createDiscountStatus);

  // GET REQUIRED DATA FROM API
  useEffect(() => {
    if (!countriesOptions.length || !citiesOptions.length) {
      dispatch(actions.locationActions.getLocationsList());
    }
    if (!vendorsOptions.length) dispatch(actions.vendorActions.getVendors());
    if (!categoriesOptions.length) dispatch(actions.categoryActions.getCategories());
  }, [dispatch, countriesOptions, citiesOptions, vendorsOptions, categoriesOptions]);

  // FORM SUBMIT
  const submitHandler = (formData) => {
    // console.log('form values', formData);

    dispatch(actions.discountsActions.createDiscount(formData));
  };

  const onOkClick = () => {
    onModalClose();
    dispatch(actions.discountsActions.clearCreateDiscountStatus());
    dispatch(actions.discountsActions.getDiscountsList());
  };

  const formik = useFormik({
    initialValues: discount,
    validationSchema,
    onSubmit: submitHandler
  });

  // console.log('formik', formik);

  // SET SELECT VALUE INTO FORMIK STATE
  const onSelectValueChange = (selected, options) => {
    const { name } = options;
    const value = selected && (selected.value || selected.length) ? selected.value : null;
    formik.setFieldValue(name, value, true);
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
      <form>
        <TextInput
          placeholder = "Discount title"
          label = "Title"
          name = "title"
          type = "text"
          className={styles.inputContainer}
          value = {formik.values.title}
          onValueChange = {formik.handleChange}
          onBlur={formik.handleBlur}
          error = {formik.errors.title}
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
            name = "vendorId"
            placeholder = "Select vendor"
            className={styles.inputContainer}
            onChange = {onSelectValueChange}
            error = {formik.errors.vendorId}
          />
          <SelectField
            options = {categoriesOptions}
            // initialValue = {transformedInitialLocation}
            label = "Category"
            name = "categoryId"
            placeholder = "Select category"
            className={styles.inputContainer}
            onChange = {onSelectValueChange}
            error = {formik.errors.categoryId}
          />
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
          placeholder = "Image Url"
          label = "Image Url"
          name = "imageUrl"
          type = "url"
          className={styles.inputContainer}
          value = {formik.values.imageUrl}
          onValueChange = {formik.handleChange}
          onBlur={formik.handleBlur}
          error = {formik.errors.imageUrl}
        />
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="description">Full Description</label>
          <textarea
            placeholder = "Full Description"
            id="description"
            name = "description"
            onChange = {formik.handleChange}
            onBlur={formik.handleBlur}
            value = {formik.values.description}
          />
          <div className = {styles.error}>{formik.errors.description}</div>
        </div>
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            placeholder = "Short Description"
            id = "shortDescription"
            name = "shortDescription"
            className={styles.shortDescr}
            value = {formik.values.shortDescription}
            onChange = {formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className = {styles.error}>{formik.errors.shortDescription}</div>
        </div>
        <div className={`${styles.discountDateSection} ${styles.twoColumnsWrapper}`}>
          <div className={styles.discountContainer}>
            <TextInput
              placeholder = "Discount flat"
              label = "Discount flat"
              name = "flatAmount"
              type = "text"
              className={styles.inputContainer}
              value = {formik.values.flatAmount}
              onValueChange = {formik.handleChange}
              onBlur={formik.handleBlur}
              disabled = {!!formik.values.percentage}
            />
            <TextInput
              placeholder = "Discount %"
              label = "Discount %"
              name = "percentage"
              type = "text"
              className={styles.inputContainer}
              onValueChange = {formik.handleChange}
              value = {formik.values.percentage}
              onBlur={formik.handleBlur}
              disabled = {!!formik.values.flatAmount}
            />
            {(formik.errors.flatAmount && formik.errors.percentage)
            && <div className = {styles.error}>{formik.errors.flatAmount || formik.errors.percentage}</div>}
          </div>
          <div className={styles.dateContainer}>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>From</label>
              <DatePicker
                format="dd-MM-y"
                name="startDate"
                className={styles.customDatePicker}
                value={formik.values.startDate}
                onChange={(value) => formik.setFieldValue('startDate', value)}
                returnValue="start"
              />
            </div>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>To</label>
              <DatePicker
                format="dd-MM-y"
                name="expirationDate"
                className={styles.customDatePicker}
                value={formik.values.expirationDate}
                onChange={(value) => formik.setFieldValue('expirationDate', value)}
                returnValue="end"
              />
            </div>
            {(formik.errors.startDate || formik.errors.expirationDate)
            && <div className = {styles.error}>{formik.errors.startDate || formik.errors.expirationDate}</div>}
          </div>
        </div >
        {createDiscountStatus.loading === false && createDiscountStatus.error
          && <div className = {styles.errorMessage}>
          {createDiscountStatus.error.message}
        </div>}
        <div className={styles.btnContainer}>
          <Button
            btnText = "Save"
            type = "submit"
            isDisabled = {!formik.isValid || !formik.dirty}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateDiscount;
