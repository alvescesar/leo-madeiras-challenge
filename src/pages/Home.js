import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Context from '../context/Context';
import { Header, MaskedInput } from '../components';
import {
  saveLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../helper/localStorage';

function Home() {
  const { values, setValues, users, setUsers } = useContext(Context);
  const { nome, cpf, email, telefone } = values;

  const userToEdit = getLocalStorage('userToEdit') || values;
  const toCreateOrToEdit = userToEdit?.index >= 0;
  const setPlaceholder = (str) =>
    `${toCreateOrToEdit ? 'Atualize' : 'Digite'} seu ${str}`;

  const emailRegEx = /\S+@\S+\.\S+/; // formato de email válido
  const validEmail = emailRegEx.test(String(email).toLowerCase());
  const nameRegEx = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/; // caracteres NÃO inclusos em nomes
  const validName = nameRegEx.test(String(nome));
  const isDisabled = !validEmail || !validName || cpf.length < 11 || telefone.length < 11;

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    setUsers([...users, values]);
  };

  const handleUpdate = (index, user) => {
    setUsers(() => [
      ...users.slice(0, index),
      user,
      ...users.slice(index + 1, users.length - 1),
    ]);

    removeLocalStorage('userToEdit');
  };

  useEffect(() => {
    saveLocalStorage('users', users);
  }, [users]);

  return (
    <section>
      <Header title={toCreateOrToEdit ? 'Editar usuário' : 'Cadastro de usuários'} />
      <form>
        <input
          type="text"
          name="nome"
          value={nome}
          placeholder={setPlaceholder('nome')}
          onChange={handleChange}
          required
        />
        <MaskedInput
          name="cpf"
          mask="999.999.999-99"
          value={cpf}
          placeholder={setPlaceholder('CPF')}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder={setPlaceholder('email')}
          onChange={handleChange}
          required
        />
        <MaskedInput
          name="telefone"
          mask="(99) 9 9999-9999"
          value={telefone}
          placeholder={setPlaceholder('telefone')}
          onChange={handleChange}
        />
        {toCreateOrToEdit ? (
          <button
            type="submit"
            disabled={isDisabled}
            onClick={() => handleUpdate(userToEdit.index, values)}
          >
            Atualizar
          </button>
        ) : (
          <button type="submit" disabled={isDisabled} onClick={handleSubmit}>
            Enviar
          </button>
        )}
      </form>
      <Link to="/directory">
        <button type="button">Ver usuários cadastrados</button>
      </Link>
    </section>
  );
}

export default Home;
