import { useState } from 'react';
import DatePicker from 'react-date-picker';
import styles from './AddDiscountModal.module.scss';
import TextInput from '../../../../components/TextInput';
import SelectField from '../../../../components/SelectField';
import Button from '../../../../components/Button';

function AddDiscountModal({ discount }) {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const onDatePickFrom = (val) => {
    setDateFrom(val);
    console.log('date picked from', val);
  };
  const onDatePickTo = (val) => {
    setDateTo(val);
    console.log('date picked to', val);
  };

  return (
    <div className={styles.modalContent}>
      <form>
        <TextInput
          // onValueChange = {onValueChange}
          placeholder = "Discount title"
          label = "Title"
          name = "title"
          className={styles.inputContainer}
          type = "text"
          value = {discount.title}
          // onBlur={onBlur}
          required
          // touched = {touched.title}
          // error = {errors.title}
        />
        <div className={styles.locationSection}>
          <div className={styles.twoColumnsWrapper}>
            <SelectField
              // options = {citiesOptions}
              // initialValue = {transformedInitialLocation}
              label = "Country"
              className={styles.inputContainer}
              // onChange = {onChangeLocation}
              // error = {errors.locationId}
            />
            <SelectField
              // options = {citiesOptions}
              // initialValue = {transformedInitialLocation}
              label = "Country"
              className={styles.inputContainer}
              // onChange = {onChangeLocation}
              // error = {errors.locationId}
            />
          </div>
          <TextInput
            // onValueChange = {onValueChange}
            // placeholder = "Address"
            label = "Address"
            name = "address"
            // type = "url"
            className={styles.inputContainer}
            // value = {discount.imageUrl}
            // onBlur={onBlur}
            required
            // touched = {touched.imageUrl}
            // error = {errors.imageUrl}
          />
        </div>
        <div className={styles.twoColumnsWrapper}>
          <SelectField
            // options = {citiesOptions}
            // initialValue = {transformedInitialLocation}
            label = "Vendor"
            placeholder = "Select vendor"
            className={styles.inputContainer}
            // onChange = {onChangeLocation}
            // error = {errors.locationId}
          />
          <SelectField
            // options = {citiesOptions}
            // initialValue = {transformedInitialLocation}
            label = "Category"
            placeholder = "Select category"
            className={styles.inputContainer}
            // onChange = {onChangeLocation}
            // error = {errors.locationId}
          />
        </div>
        <SelectField
          // options = {citiesOptions}
          // initialValue = {transformedInitialLocation}
          label = "Tags"
          placeholder = "Select tag"
          className={styles.inputContainer}
          isMulti={true}
          // onChange = {onChangeLocation}
          // error = {errors.locationId}
        />
        <TextInput
          // onValueChange = {onValueChange}
          placeholder = "Image Url"
          label = "Image Url"
          name = "imageUrl"
          type = "url"
          className={styles.inputContainer}
          value = {discount.imageUrl}
          // onBlur={onBlur}
          required
          // touched = {touched.imageUrl}
          // error = {errors.imageUrl}
        />
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="description">Full Description</label>
          <textarea
            // onChange = {onValueChange}
            placeholder = "Full Description"
            // value = {discount.description}
            id="description"
            name = "description"
            // onBlur={onBlur}
            required
            // touched = {touched.description ? 1 : 0}
          />
        </div>
        <div className={`${styles.inputContainer} ${styles.textareaWrapper}`}>
          <label htmlFor="short_description">Short Description</label>
          <textarea
            // onChange = {onValueChange}
            placeholder = "Short Description"
            // value = {discount.description}
            className={styles.shortDescr}
            id = "short_description"
            name = "short_description"
            // onBlur={onBlur}
            required
            // touched = {touched.description ? 1 : 0}
          />
        </div>
        <div className={`${styles.discountDateSection} ${styles.twoColumnsWrapper}`}>
          <div className={styles.discountContainer}>
            <TextInput
              // onValueChange = {onValueChange}
              placeholder = "Discount flat"
              label = "Discount flat"
              name = "discount_flat"
              className={styles.inputContainer}
              type = "text"
              // value = {discount.title}
              // onBlur={onBlur}
              required
              // touched = {touched.title}
              // error = {errors.title}
            />
            <TextInput
              // onValueChange = {onValueChange}
              placeholder = "Discount %"
              label = "Discount %"
              name = "discount_percentage"
              className={styles.inputContainer}
              type = "text"
              // value = {discount.title}
              // onBlur={onBlur}
              required
              // touched = {touched.title}
              // error = {errors.title}
            />
          </div>
          <div className={styles.dateContainer}>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>From</label>
              <DatePicker
                format="dd-MM-y"
                name="date_from"
                className={styles.customDatePicker}
                defaultValue={null}
                value={dateFrom}
                onChange={onDatePickFrom}
              />
            </div>
            <div className={`${styles.labelInputRow} ${styles.inputContainer}`}>
              <label>To</label>
              <DatePicker
                format="dd-MM-y"
                name="date_to"
                className={styles.customDatePicker}
                defaultValue={null}
                value={dateTo}
                onChange={onDatePickTo}
              />
            </div>
          </div>
        </div >
        <div className={styles.btnContainer}>
          <Button
            btnText = "Save"
            // onClick = {onSaveButtonClick}
            // isDisabled = {isDisabled}
            type = "submit"
          />
        </div>
      </form>
    </div>
  );
}

export default AddDiscountModal;
