import CreatableSelect from 'react-select/creatable';
import style from './CreatableSelectField.module.scss';
import customStyles from './CreatableSelectField.styles';

function CreatableSelectField({
  label,
  initialValue,
  value,
  options,
  onChange,
  isLoading,
  isSearchable = true,
  isClearable = false,
  className = '',
  isDisabled = false,
  isMulti = false,
  error = '',
  onBlur,
  value,
  name
}) {
  return (
    <div className = {`${style.container} ${className}`}>
      {label != null && <label className = {style.label}>{label}</label>}
      <CreatableSelect
        styles = {customStyles}
        defaultValue = {initialValue}
        value = {value}
        isLoading = {isLoading}
        isClearable = {isClearable}
        isSearchable = {isSearchable}
        options = {options}
        onChange = {onChange}
        isDisabled = {isDisabled}
        isMulti = {isMulti}
        onBlur = {onBlur}
        value = {value}
        name = {name}
      />
      <div className = {style.error}>{error}</div>
    </div>
  );
}

export default CreatableSelectField;
