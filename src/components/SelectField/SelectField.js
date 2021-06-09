import React from 'react';
import Select from 'react-select';
import './SelectField.styles.scss';
import customStyles from './SelectField.styles';

function SelectField({
  initialValue,
  options,
  label,
  onChange,
  isLoading,
  isSearchable = true,
  isClearable = true,
  className,
  placeholder = '',
  isDisabled = false,
  isMulti = false
}) {
  return (
    <div className = "container-select-field">
      {label && <label className = "label-select-field">{label}</label>}
      <Select
        styles = {customStyles}
        className = {className}
        classNamePrefix = "select"
        defaultValue = {initialValue}
        isLoading = {isLoading}
        isClearable = {isClearable}
        isSearchable = {isSearchable}
        options = {options}
        onChange = {onChange}
        placeholder = {placeholder}
        isDisabled = {isDisabled}
        isMulti = {isMulti}
      />
    </div>
  );
}

export default SelectField;
