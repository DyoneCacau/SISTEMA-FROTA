import * as yup from 'yup';

const userValidator = yup.object().shape({
  name: yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres').max(100, 'O nome não pode exceder 100 caracteres').required('O nome é obrigatório'),
  email: yup.string().email('O e-mail deve ser válido').required('O e-mail é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(50, 'A senha não pode exceder 50 caracteres').required('A senha é obrigatória'),
  role: yup.string().valid('admin', 'user').required('A função é obrigatória'),
});

export default userValidator;
