const selectValidation = (value) => {
  console.log(value);
  if (value === null || value === '') {
    return 'This field is required';
  }
  return null;
};

export default selectValidation;
