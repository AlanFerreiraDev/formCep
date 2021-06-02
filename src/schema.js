import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string('Precisa ter Letras')
    .min(2, 'No mínimo duas Palavras')
    .required('O nome é Obrigatório'),

  email: Yup.string('Precisa ter Palavras')
    .email('Digite um E-mail Válido')
    .required('O E-mail é Obrigatório'),
});
