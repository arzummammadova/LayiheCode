import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().positive().required(),
  description: yup.string().required().min(10),
  image: yup.string().required(),
  category: yup.string().required(),
  author: yup.string().required(),
  genre: yup.string().required(),
  publishedDate: yup.date().typeError('Düzgün tarix formatı daxil edin').required('Tarix vacibdir')

});

export default schema;
