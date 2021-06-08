import React from 'react';
import Select from 'react-select';
import style from './styles.module.scss';
import customStyles from './customStyles';

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
      {label && <label className = {style.label}>{label}</label>}
      <Select
        styles = {customStyles}
        className = {className}
        classNamePrefix = "select"
        defaultValue = {initialValue}
        isLoading = {isLoading}
        isClearable = {isClearable}
        isSearchable = {isSearchable}
        name = "color"
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
