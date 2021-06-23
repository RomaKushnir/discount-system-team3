import CreatableSelect from 'react-select/creatable';
import style from './CreatableSelectField.module.scss';
import customStyles from './CreatableSelectField.styles';

function CreatableSelectField({
  label,
  initialValue,
  options,
  onChange,
  isLoading,
  isSearchable = true,
  isClearable = false,
  className,
  isDisabled = false,
  isMulti,
  error = '',
  onBlur
}) {
  console.log(initialValue);
  return (
    <div className = {style.container}>
      {label != null && <label className = {style.label}>{label}</label>}
      <CreatableSelect
        styles = {customStyles}
        className = {className}
        defaultValue = {initialValue}
        isLoading = {isLoading}
        isClearable = {isClearable}
        isSearchable = {isSearchable}
        options = {options}
        onChange = {onChange}
        isDisabled = {isDisabled}
        isMulti = {isMulti}
        onBlur = {onBlur}
      />
      <div className = {style.error}>{error}</div>
    </div>
  );
}

export default CreatableSelectField;
