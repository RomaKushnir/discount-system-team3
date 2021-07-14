import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().min(3, 'The field needs to be at least 3 characters').required('The field is required'),
  imageUrl: yup.string().matches(/https?:\/\/.*\./i, 'The link is not correct'),
  description: yup.string().min(3, 'The field needs to be at least 3 characters')
    .max(500, 'The field needs to be less then 500 characters').required('The field is required'),
  shortDescription: yup.string().min(3, `The field needs to be at least 3 characters`)
    .max(500, `The field needs to be less then 500 characters`).required('The field is required'),
  flatAmount: yup.number().typeError('Field value should be a number').nullable()
    .test('flatAmount', 'One discount field is required', function () {
      return (!this.parent.flatAmount && this.parent.percentage) || this.parent.flatAmount;
    }),
  percentage: yup.number().typeError('Field value should be a number').nullable()
    .test('percentage', 'One discount field is required', function () {
      return (!this.parent.percentage && this.parent.flatAmount) || this.parent.percentage;
    }),
  locationIds: yup.mixed().test('locationIds', 'The field is required', (val) => !val || val.length),
  vendorId: yup.string().nullable().required('The field is required'),
  categoryId: yup.string().nullable().required('The field is required'),
  startDate: yup.date().nullable().required('Date fields are required'),
  expirationDate: yup.date().nullable().required('Date fields are required')
});

export default schema;
