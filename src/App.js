import React from 'react';
import { Formik, Field, Form } from 'formik';
import schema from './schema';
import './App.css';

function App() {
  function onSubmit(values, actions) {
    console.log('SUBMIT', values);
  }

  function onBlurCep(e, setFieldValue) {
    //* A interrogação é um aoptional Channing, ele dá um erro quando o length é null ou undefined, antes eraa assim
    //* if(e.target.value && e.target.value.length !== 8), se o length fosse undefined ou null, eu só faria assim, ou para o target, exemplo se eu não osubesse que o target existe, seria target?.length
    const { value } = e.target;

    //* Regex para limpar o CEP e deixar só número para chegar crto na API
    //* Usar no console,para ver o resultado
    //* Dar match de 0 a 9, g = global, em toda a string, e o circunflexo significa ele fazer o contrario, em vez de pegar só números de 0 a 9, pegar o que não é número
    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      //* Aqui eu evito ficar fazendo flags com valor, quando dá errado ele retorna com nada e para a função
      return;
    }

    //* API
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFieldValue('logradouro', data.logradouro);
        setFieldValue('complemento', data.complemento);
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('uf', data.uf);
      });
  }

  return (
    <div className="App">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnMount
        initialValues={{
          name: '',
          email: '',
        }}
        //* A função setFieldValue, vai fazer a troca dos valores da API para os campos na pagina, porém eu preciso passar ela para a função render, para fazer isso eu mudio o método onBlur, e faço um arrow function disparar com o evento, e receber o evento, mais o setFieldValue, que é do Formik
        render={({ isValid, setFieldValue }) => (
          <Form>
            <div className="form-control-group">
              <label>CEP: </label>
              <Field
                name="cep"
                type="text"
                onBlur={(e) => onBlurCep(e, setFieldValue)}
              />
            </div>

            <div className="form-control-group">
              <label>Logradouro: </label>
              <Field name="logradouro" type="text" />
            </div>

            <div className="form-control-group">
              <label>Número: </label>
              <Field name="numero" type="text" />
            </div>

            <div className="form-control-group">
              <label>Complemento: </label>
              <Field name="complemento" type="text" />
            </div>

            <div className="form-control-group">
              <label>Bairro: </label>
              <Field name="bairro" type="text" />
            </div>

            <div className="form-control-group">
              <label>Cidade: </label>
              <Field name="cidade" type="text" />
            </div>

            <div className="form-control-group">
              <label>Estado: </label>
              {/* //* Para transformar em um select, basta eu passar o component
              como select e tratar a tag Field como se fosse o selçect,
              colocando os options e tudo mais */}
              <Field component="select" name="uf">
                <option value={null}>Selecione o Estado</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="ES">Espírito Santo</option>
                <option value="SC">Santa Catarina</option>
              </Field>
            </div>

            <button type="submit" disabled={!isValid}>
              Enviar
            </button>
          </Form>
        )}
      />
    </div>
  );
}

export default App;
