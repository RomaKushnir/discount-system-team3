const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '10px',
    borderWidth: '1px',
    boxShadow: 'none',
    fontSize: '16px',
    border: state.isFocused && '1px solid #40BFEF',
    '&:hover': {
      border: '1px solid #40BFEF',
      boxShadow: 'none'
    }
  }),
  menu: (provided) => ({
    ...provided,
    color: '#1D1D1D'
  }),
  option: (provided) => ({
    ...provided,
    overflow: 'hidden'
  })
};

export default customStyles;
