import axios from './axiosClient';

export const login = (data) => axios.post('https://sandbox-discount.herokuapp.com/signin', data);

export const getUser = () => {
  console.log('getUser');
  return {
    email: 'admin@gmail.com',
    firstName: 'Admin',
    id: 0,
    lastName: 'Test',
    location: {
      city: 'Kyiv',
      country: 'Ukraine',
      id: 1
    },
    password: '1111',
    role: {
      id: 0,
      name: 'admin'
    }
  };
  // return {
  //   email: 'test_user@gmail.com',
  //   firstName: 'Test',
  //   id: 1,
  //   lastName: 'Test',
  //   location: {
  //     city: 'Minsk',
  //     country: 'Belarus',
  //     id: 6
  //   },
  //   password: '1111',
  //   role: {
  //     id: 1,
  //     name: 'regular'
  //   }
  // };
};
