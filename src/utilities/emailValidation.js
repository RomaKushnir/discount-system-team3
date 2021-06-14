const emailMaxLength = 255;

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

export default emailValidation;
