const idValidation = (id) => {
  if (id === Number(id) || id === '') {
    return null;
  }
  return 'Please enter a valid id';
};

export default idValidation;
