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
  className = '',
  placeholder = '',
  isDisabled = false,
  isMulti = false,
  error = '',
  onBlur,
  name = ''
}) {
  return (
    <div className = {`${style.container} ${className}`}>
      {label != null && <label className = {style.label}>{label}</label>}
      <Select
        styles = {customStyles}
        classNamePrefix = "select"
        name = {name}
        value = {initialValue}
        isLoading = {isLoading}
        isClearable = {isClearable}
        isSearchable = {isSearchable}
        options = {options}
        onChange = {onChange}
        placeholder = {placeholder}
        isDisabled = {isDisabled}
        isMulti = {isMulti}
        onBlur = {onBlur}
      />
      <div className = {style.error}>{error}</div>
    </div>
  );
}

export default SelectField;
