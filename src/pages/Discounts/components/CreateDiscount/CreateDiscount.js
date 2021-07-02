import { useEffect, useCallback, useMemo } from 'react';
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
  getLocationsOptions,
  getVendorsOptions,
  getCountriesOptions,
  getCitiesGroupedByCountryOptions,
  getCategoriesOptions,
  getTypeaheadVendorsOptions
} from '../../../../store/selectors';

function CreateDiscount({
  discount,
  onModalClose
}) {
  const dispatch = useDispatch();
  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesGroupedByCountryOptions);
  const vendorsOptions = useSelector(getVendorsOptions);
  const categoriesOptions = useSelector(getCategoriesOptions);
  const createDiscountStatus = useSelector((state) => state.discountsReducer.createDiscountStatus);
  const locationOptions = useSelector(getLocationsOptions);
  const vendorsTypeaheadOptions = useSelector(getTypeaheadVendorsOptions);

  // SET INITIAL VALUE TO SELECTS
  const initialVendorOptions = discount ? {
    value: discount.vendor.id,
    label: discount.vendor.title
  }
    : null;

  const initialCategoryOptions = discount ? {
    value: discount.category.id,
    label: discount.category.title
  }
    : null;

  const initialLocationsOptions = useMemo(() => (discount ? discount.locations.map((el) => ({
    value: el.id,
    label: Object.values(el).join(', ')
  })) : null), [discount]);

  const locationsToRequst = useMemo(() => (discount && discount.locations.map((el) => (el.id))), [discount]);

  const isFormSubmitted = createDiscountStatus.loading === false && createDiscountStatus.success;

  // DEFINE VALUES THAT ARE REQUESTED
  const discountRequest = {
    title: discount ? discount.title : '',
    imageUrl: discount ? discount.imageUrl : '',
    description: discount ? discount.description : '',
    shortDescription: discount ? discount.shortDescription : '',
    flatAmount: discount ? discount.flatAmount : '',
    percentage: discount ? discount.percentage : '',
    startDate: discount ? new Date(discount.startDate) : new Date(Date.now()),
    expirationDate: discount ? new Date(discount.expirationDate) : null,
    locationIds: discount ? locationsToRequst : [],
    categoryId: discount ? discount.category.id : null,
    vendorId: discount ? discount.vendor.id : null,
    // mocked fields
    perUser: 1,
    price: 0,
    quantity: 1
  };

  // GET REQUIRED DATA FROM API
  useEffect(() => {
    if (!countriesOptions.length || !citiesOptions.length) {
      dispatch(actions.locationActions.getLocationsList());
    }
    // if (!vendorsOptions.length) dispatch(actions.vendorActions.getVendors());

    // if (!vendorsOptions.length) {
    //   const showMore = false;
    //   dispatch(actions.vendorActions.applyVendorsFilters(showMore));
    // }

    if (!categoriesOptions.length) dispatch(actions.categoryActions.getCategories());
  }, [dispatch, countriesOptions, citiesOptions, vendorsOptions, categoriesOptions]);

  // FORM SUBMIT
  const submitHandler = (formData) => {
    if (discount) {
      const formDataUpdate = { ...formData, id: discount.id };
      dispatch(actions.discountsActions.createDiscount(formDataUpdate));
    } else {
      dispatch(actions.discountsActions.createDiscount(formData));
    }
  };

  const onOkClick = () => {
    onModalClose();
    dispatch(actions.discountsActions.clearCreateDiscountStatus());
    dispatch(actions.discountsActions.getDiscountsList());
  };

  const formik = useFormik({
    initialValues: discountRequest,
    validationSchema,
    onSubmit: submitHandler
  });

  // SET SELECT VALUE INTO FORMIK STATE
  const onSelectValueChange = (selected, options) => {
    const { name } = options;
    let value;
    if (Array.isArray(selected)) {
      value = selected.map((el) => el.value);
    } else {
      value = selected && selected.value;
    }
    formik.setFieldValue(name, value, true);
  };

  const onVendorSelectChange = (characters) => {
    console.log(characters);
    dispatch(actions.vendorActions.getTypeaheadVendors(characters));
  };

  const onVendorsSelectorBlur = () => {
    dispatch(actions.vendorActions.clearVendorsTypeahead());
  };

  const startDateHandler = useCallback((value) => formik.setFieldValue('startDate', value), [formik]);

  const expirationDateHandler = useCallback((value) => formik.setFieldValue('expirationDate', value), [formik]);

  return (
    <div className={styles.modalContent}>
      {isFormSubmitted
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
      <form className={isFormSubmitted ? styles.formDisplayNone : ''}>
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
        <div className={styles.twoColumnsWrapper}>
          <SelectField
            // options = {vendorsOptions}
            options = {vendorsTypeaheadOptions}
            initialValue = {initialVendorOptions}
            label = "Vendor"
            name = "vendorId"
            placeholder = "Select vendor"
            className={styles.inputContainer}
            onChange = {onSelectValueChange}
            onInputChange={(characters) => onVendorSelectChange(characters)}
            error = {formik.errors.vendorId}
            onBlur = {onVendorsSelectorBlur}
          />
          <SelectField
            options = {categoriesOptions}
            initialValue = {initialCategoryOptions}
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
          name = "tagIds"
          placeholder = "Select tag"
          className={styles.inputContainer}
          isMulti={true}
          onChange = {onSelectValueChange}
          // error = {formik.errors.tags}
        /> */}
        <SelectField
          options = {locationOptions}
          initialValue={initialLocationsOptions}
          label = "Location"
          name = "locationIds"
          className={styles.inputContainer}
          isMulti={true}
          onChange = {onSelectValueChange}
          error = {formik.errors.locationIds}
        />
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
                onChange={startDateHandler}
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
                onChange={expirationDateHandler}
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
