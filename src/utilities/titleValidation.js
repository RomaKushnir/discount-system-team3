const titleMaxLength = 50;
const titleMinLength = 3;

const titleValidation = (title) => {
  if (title.trim() === '') {
    return `${title} is required`;
  }
  if (title.trim().length < titleMinLength) {
    return `${title} needs to be at least three characters`;
  }
  if (title.trim().length > titleMaxLength) {
    return 'Title is too long';
  }
  return null;
};

export default titleValidation;
