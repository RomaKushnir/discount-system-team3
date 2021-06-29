import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().min(3, 'The field needs to be at least 3 characters').required('The field is required'),
  imageUrl: yup.string().matches(/https?:\/\/.*\./i, 'The link is not correct'),
  description: yup.string().min(3, 'The field needs to be at least 3 characters')
    .max(500, 'The field needs to be less then 500 characters').required('The field is required'),
  shortDescription: yup.string().min(3, `The field needs to be at least 3 characters`)
    .max(500, `The field needs to be less then 500 characters`).required('The field is required'),
  flatAmount: yup.string().test('flatAmount', 'One discount field is required', function () {
    return (!this.parent.flatAmount && this.parent.percentage) || this.parent.flatAmount;
  }),
  percentage: yup.string().test('percentage', 'One discount field is required', function () {
    return (!this.parent.percentage && this.parent.flatAmount) || this.parent.percentage;
  }),
  vendorId: yup.number().nullable().required('The field is required'),
  categoryId: yup.number().nullable().required('The field is required'),
  startDate: yup.date().nullable().required('Date fields are required'),
  expirationDate: yup.date().nullable().required('Date fields are required')
});

export default schema;
