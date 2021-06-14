const titleValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === '') {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return 'Invalid characters';
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};

export default titleValidation;
