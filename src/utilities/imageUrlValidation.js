const imageUrlMaxLength = 510;
const imageUrlMinLength = 3;

const imageUrlValidation = (imageUrl) => {
  if (imageUrl.trim() === '') {
    return 'Url is required';
  }
  if (/https?:\/\//
    .test(imageUrl)) {
    return null;
  }
  if (imageUrl.trim().length < imageUrlMinLength) {
    return `${imageUrl} needs to be at least three characters`;
  }
  if (imageUrl.trim().length > imageUrlMaxLength) {
    return 'Url is too long';
  }
  return 'Please enter a valid Url';
};

export default imageUrlValidation;
