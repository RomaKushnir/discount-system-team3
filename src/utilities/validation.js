const emailMaxLength = 255;
const descriptionMaxLength = 510;
const descriptionMinLength = 3;
const imageUrlMaxLength = 510;
const imageUrlMinLength = 3;
const titleMaxLength = 50;
const titleMinLength = 3;
const passwordMinLength = 8;

const idValidation = (id) => {
  if (id === Number(id) || id === '') {
    return null;
  }
  return 'Please enter a valid id';
};

const emailValidation = (email) => {
  if (
    /[-.\w]+@([\w-]+\.)+[\w-]+/g.test(
      email
    )
  ) {
    return null;
  }
  if (email.trim() === '') {
    return 'Email is required';
  }
  if (email.trim().length > emailMaxLength) {
    return 'Email is too long';
  }
  return 'Please enter a valid email';
};

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

const imageUrlValidation = (imageUrl) => {
  if (imageUrl.trim() === '') {
    return 'Url is required';
  }
  if (/./ // temporary for testing
    .test(imageUrl)) {
    return null;
  }
  if (imageUrl.trim().length < imageUrlMinLength) {
    return `${imageUrl} needs to be at least ${imageUrlMinLength} characters`;
  }
  if (imageUrl.trim().length > imageUrlMaxLength) {
    return 'Url is too long';
  }
  return 'Please enter a valid Url';
};

const selectValidation = (value) => {
  if (value === null || value === '') {
    return 'This field is required';
  }
  return null;
};

const passwordValidation = (password) => {
  if (
    /^\d{4,}$/g.test( // Minimum four characters
      password
    )
  ) {
    return null;
  }
  if (password.trim() === '') {
    return 'Password is required';
  }
  if (password.trim().length < passwordMinLength) {
    return 'Password is too short';
  }
  return 'Please enter a valid password';
};

const titleValidation = (title) => {
  if (title.trim() === '') {
    return `This field is required`;
  }
  if (title.trim().length < titleMinLength) {
    return `This field needs to be at least ${titleMinLength} characters`;
  }
  if (title.trim().length > titleMaxLength) {
    return 'Title is too long';
  }
  return null;
};

const requiredValidate = (str) => {
  if (!str) {
    return `This field is required`;
  }
  return '';
};

const inputValidate = (inputName, str) => {
  switch (inputName) {
    case 'title': return titleValidation(str);
    case 'imageUrl': return imageUrlValidation(str);
    case 'description': return companyDescriptionValidation(str);
    case 'shortDescription': return companyDescriptionValidation(str);
    default: return requiredValidate(str);
  }
};

export {
  idValidation,
  emailValidation,
  companyDescriptionValidation,
  imageUrlValidation,
  selectValidation,
  titleValidation,
  passwordValidation,
  inputValidate,
  requiredValidate
};
