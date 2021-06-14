const descriptionMaxLength = 510;
const descriptionMinLength = 3;

const companyDescriptionValidation = (description) => {
  if (description.trim() === '') {
    return 'Description is required';
  }
  if (description.trim().length < descriptionMinLength) {
    return 'Description needs to be at least three characters';
  }
  if (description.trim().length > descriptionMaxLength) {
    return 'Description is too long';
  }
  return null;
};

export default companyDescriptionValidation;
