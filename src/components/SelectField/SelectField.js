import Select from 'react-select';
import style from './SelectField.module.scss';
import customStyles from './SelectField.styles';

function SelectField({
  initialValue,
  value,
  options,
  label,
  onChange,
  isLoading,
  isSearchable = true,
  isClearable = true,
  className = '',
  placeholder = '',
  isDisabled = false,
  isMulti = false,
  error = '',
  onBlur,
  name = '',
  onInputChange,
  menuPlacement = 'auto'
}) {
  return (
    <div className = {`${style.container} ${className}`}>
      {label != null && <label className = {style.label}>{label}</label>}
      <Select
        styles = {customStyles}
        classNamePrefix = "select"
        name = {name}
        defaultValue = {initialValue}
        value = {value}
        isLoading = {isLoading}
        isClearable = {isClearable}
        isSearchable = {isSearchable}
        options = {options}
        onChange = {onChange}
        placeholder = {placeholder}
        isDisabled = {isDisabled}
        isMulti = {isMulti}
        onBlur = {onBlur}
        onInputChange = {onInputChange}
        menuPlacement = {menuPlacement}
      />
      <div className = {style.error}>{error}</div>
    </div>
  );
}

export default SelectField;
