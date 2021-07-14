import {
  useEffect, useCallback, useMemo, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from 'react-date-picker';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import validationSchema from '../../../../utilities/validationSchema';
import styles from './CreateDiscount.module.scss';
import TextInput from '../../../../components/TextInput';
import SelectField from '../../../../components/SelectField';
import Button from '../../../../components/Button';
import * as actions from '../../../../store/actions';
import {
  getCategoriesOptions,
  getTypeaheadVendorsOptions
} from '../../../../store/selectors';
import useVendorTypeahead from '../../../../utilities/useVendorTypeahead';
import Vocabulary from '../../../../translations/vocabulary';
import combineLocation from '../../../../utilities/combineLocation';

function CreateDiscount({
  discount,
  onModalClose,
  onDiscountModalClose
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [onVendorSelectInputChange, onVendorSelectBlur] = useVendorTypeahead();
  const [discountVendor, setDiscountVendor] = useState();
  const categoriesOptions = useSelector(getCategoriesOptions);
  const createDiscountStatus = useSelector((state) => state.discountsReducer.createDiscountStatus);
  const vendorsTypeaheadOptions = useSelector(getTypeaheadVendorsOptions);

  // SET INITIAL VALUE TO SELECTS
  const initialVendorOptions = discount ? {
    value: discount.vendor.id,
    label: discount.vendor.title
  }
    : null;

  const initialCategoryOptions = discount ? {
    value: discount.category.id,
    label: discount.category.title,
    tags: discount.category.tags
  }
    : null;

  const initialLocationsOptions = useMemo(() => (discount ? discount.locations.map((el) => ({
    value: el.id,
    label: Object.values(el).join(', ')
  })) : null), [discount]);

  const locationsToRequst = useMemo(() => (discount && discount.locations.map((el) => (el.id))), [discount]);

  const isFormSubmitted = createDiscountStatus.loading === false && createDiscountStatus.success;

  console.log('SUBMIT', isFormSubmitted);

  // DEFINE VALUES THAT ARE REQUESTED
  const discountRequest = {
    title: discount?.title || '',
    imageUrl: discount?.imageUrl || '',
    promocode: discount?.promocode || '',
    description: discount?.description || '',
    shortDescription: discount?.shortDescription || '',
    flatAmount: discount?.flatAmount || '',
    percentage: discount?.percentage || '',
    startDate: discount ? new Date(discount.startDate) : new Date(Date.now()),
    expirationDate: discount ? new Date(discount.expirationDate) : null,
    locationIds: discount ? locationsToRequst : [],
    categoryId: discount?.category.id || null,
    vendorId: discount?.vendor.id || null,
    tagIds: discount?.tags.map((el) => el.id) || [],
    tags: discount?.tags.map((el) => ({ label: el.name, value: el.id })) || []
  };

  // GET REQUIRED DATA FROM API
  useEffect(() => {
    if (!categoriesOptions.length) dispatch(actions.categoryActions.getCategories());
  }, [dispatch, categoriesOptions]);

  // FORM SUBMIT
  const submitHandler = ({ tags, ...data }) => {
    console.log(data);

    let updatedFormData = {};

    if (data.promocode === '') {
      updatedFormData = { ...data, promocode: null };
    }

    if (discount) {
      const formDataUpdate = { ...updatedFormData, id: discount.id };
      dispatch(actions.discountsActions.createDiscount(formDataUpdate));
    } else {
      dispatch(actions.discountsActions.createDiscount(updatedFormData));
    }
  };

  const onOkClick = () => {
    onModalClose();
    onDiscountModalClose();
    dispatch(actions.discountsActions.clearCreateDiscountStatus());
    dispatch(actions.discountsActions.applyDiscountsFilters({ showMore: false, rewriteUrl: false }));
  };

  const formik = useFormik({
    initialValues: discountRequest,
    validationSchema,
    onSubmit: submitHandler
  });

  // SET SELECT VALUE INTO FORMIK STATE
  const onSelectValueChange = (selected, options) => {
    console.log(selected, options);
    const { name } = options;
    let value;
    if (Array.isArray(selected)) {
      value = selected.map((el) => el.value);
    } else {
      value = selected && selected.value;
    }
    console.log(name);
    if (name === 'categoryId') {
      console.log('CHANGE CATEGORY');
      formik.setFieldValue('tags', [], true);
      formik.setFieldValue('tagIds', [], true);
      console.log(formik.values);
    }
    if (name === 'vendorId') {
      formik.setFieldValue('locationIds', [], true);
      setDiscountVendor(selected);
    }

    formik.setFieldValue(name, value, true);

    if (name === 'tags') {
      console.log(value);
      console.log(selected);
      formik.setFieldValue('tagIds', value, true);
      formik.setFieldValue('tags', selected, true);
    }
  };

  const startDateHandler = useCallback((value) => formik.setFieldValue('startDate', value), [formik]);

  const expirationDateHandler = useCallback((value) => formik.setFieldValue('expirationDate', value), [formik]);

  const tagsOptions = useMemo(() => (formik.values.categoryId ? categoriesOptions
    .find((el) => el.id === formik.values.categoryId).tags.map((tag) => ({ value: tag.id, label: tag.name }))
    : []), [formik.values.categoryId, categoriesOptions]);

  const initialTagsOptions = useMemo(() => (formik.values.tags ? formik.values.tags
    .map((tag) => {
      console.log(formik.values.tags);
      console.log(tag);
      return tag;
    })
    : []), [formik.values.tags]);

  const locationOptions = useMemo(
    () => discountVendor?.locations.map((location) => combineLocation(location)) || [], [discountVendor]
  );

  console.log(discount.tags);
  console.log(tagsOptions);
  console.log(formik.values);
  console.log(initialTagsOptions);

  return (
    <div className={styles.modalContent}>
      {isFormSubmitted
      && <div className = {styles.successMessageContainer}>
        <div className = {styles.successMessage}>{createDiscountStatus.success}</div>
        <Button
          btnText = {t(Vocabulary.OK)}
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
          placeholder = {t(Vocabulary.DISCOUNT_TITLE)}
          label = {t(Vocabulary.TITLE)}
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
            options = {vendorsTypeaheadOptions}
            initialValue = {initialVendorOptions}
            label = {t(Vocabulary.VENDOR_MIN_3_CHARS)}
            name = "vendorId"
            placeholder = {t(Vocabulary.SELECT_VENDOR)}
            className={styles.inputContainer}
            onChange = {onSelectValueChange}
            onInputChange={(characters) => onVendorSelectInputChange(characters)}
            error = {formik.errors.vendorId}
            onBlur = {onVendorSelectBlur}
          />
          <SelectField
            options = {categoriesOptions}
            initialValue = {initialCategoryOptions}
            label = {t(Vocabulary.CATEGORY)}
            name = "categoryId"
            placeholder = {t(Vocabulary.SELECT_CATEGORY)}
            className={styles.inputContainer}
            onChange = {onSelectValueChange}
            error = {formik.errors.categoryId}
          />
        </div>
        <SelectField
          options = {tagsOptions}
          value = {initialTagsOptions}
          label = {t(Vocabulary.TAGS)}
          name = "tags"
          placeholder = {t(Vocabulary.SELECT_TAGS)}
          className={styles.inputContainer}
          isMulti={true}
          onChange = {onSelectValueChange}
          error = {formik.errors.tags}
        />
        <SelectField
          options = {locationOptions}
          initialValue={initialLocationsOptions}
          label = {t(Vocabulary.LOCATION)}
          name = "locationIds"
          className={styles.inputContainer}
          isMulti={true}
          onChange = {onSelectValueChange}
          error = {formik.errors.locationIds}
        />
        <TextInput
          placeholder = {t(Vocabulary.IMAGE_URL)}
          label = {t(Vocabulary.IMAGE_URL)}
          name = "imageUrl"
          type = "url"
          className={styles.inputContainer}
          value = {formik.values.imageUrl}
          onValueChange = {formik.handleChange}
          onBlur={formik.handleBlur}
          error = {formik.errors.imageUrl}
        />
        <TextInput
          placeholder = {t(Vocabulary.PROMO_CODE)}
          label = {t(Vocabulary.PROMO_CODE)}
          name = "promocode"
          type = "text"
          className={styles.inputContainer}
          value = {formik.values.promocode}
          onValueChange = {formik.handleChange}
          onBlur={formik.handleBlur}
          error = {formik.errors.promocode}
        />
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="description">{t(Vocabulary.FULL_DESCRIPTION)}</label>
          <textarea
            placeholder = {t(Vocabulary.FULL_DESCRIPTION)}
            id="description"
            name = "description"
            onChange = {formik.handleChange}
            onBlur={formik.handleBlur}
            value = {formik.values.description}
          />
          <div className = {styles.error}>{formik.errors.description}</div>
        </div>
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="shortDescription">{t(Vocabulary.SHORT_DESCRIPTION)}</label>
          <textarea
            placeholder = {t(Vocabulary.SHORT_DESCRIPTION)}
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
              placeholder = {t(Vocabulary.DISCOUNT_FLAT)}
              label = {t(Vocabulary.DISCOUNT_FLAT)}
              name = "flatAmount"
              type = "text"
              className={styles.inputContainer}
              value = {formik.values.flatAmount}
              onValueChange = {formik.handleChange}
              onBlur={formik.handleBlur}
              disabled = {!!formik.values.percentage}
            />
            <TextInput
              placeholder = {t(Vocabulary.DISCOUNT_PERCENTAGE)}
              label = {t(Vocabulary.DISCOUNT_PERCENTAGE)}
              name = "percentage"
              type = "text"
              className={styles.inputContainer}
              onValueChange = {formik.handleChange}
              value = {formik.values.percentage}
              onBlur={formik.handleBlur}
              disabled = {!!formik.values.flatAmount}
            />
            {(formik.errors.flatAmount || formik.errors.percentage)
            && <div className = {styles.error}>{formik.errors.flatAmount || formik.errors.percentage}</div>}
          </div>
          <div className={styles.dateContainer}>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>{t(Vocabulary.FROM)}</label>
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
              <label>{t(Vocabulary.TO)}</label>
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
            btnText = {t(Vocabulary.SAVE)}
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
