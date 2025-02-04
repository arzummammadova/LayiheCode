import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().positive().integer().required(),
  description: yup.string().required().min(10),
  image:yup.string().required(),
});


export default schema