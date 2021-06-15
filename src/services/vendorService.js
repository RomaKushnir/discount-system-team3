// import axios from 'API';

export const addVendor = (data) => {
  console.log(data); // temporary to check flow

  return 'Vendor successfully added'; // temporary to check flow
};

export const updateVendor = ({ id, ...data }) => {
  console.log(id); // temporary to check flow
  console.log(data); // temporary to check flow

  return 'Vendor successfully updated'; // temporary to check flow
};

export const deleteVendor = (data) => {
  console.log(data); // temporary to check flow

  return 'Vendor successfully deleted'; // temporary to check flow
};
