import * as Yup from 'yup';

const vehicleValidator = Yup.object().shape({
  modelo: Yup.string().required('O modelo é obrigatório'),
  ano: Yup.number().required('O ano é obrigatório'),
  placa: Yup.string().required('A placa é obrigatória'),
  proprietario: Yup.string().required('O proprietário é obrigatório')
});

export default vehicleValidator;
