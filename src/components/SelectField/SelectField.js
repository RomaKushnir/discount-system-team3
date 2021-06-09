import React from 'react';
import Select from 'react-select';
import style from './SelectField.module.scss';
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
    <div className = {style.container}>
      {label != null && <label className = {style.label}>{label}</label>}
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
