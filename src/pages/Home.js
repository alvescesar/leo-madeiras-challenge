import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Context from '../context/Context';
import { Header, MaskedInput } from '../components';

function Home() {
  const { values, setValues, users, setUsers } = useContext(Context);
  const { nome, cpf, email, telefone } = values;

  const userToEdit = JSON.parse(localStorage.getItem('userToEdit')) || values;

  const emailRegEx = /\S+@\S+\.\S+/; // formato de email válido
  const validEmail = emailRegEx.test(String(email).toLowerCase());
  const nameRegEx = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/; // caracteres NÃO inclusos em nomes
  const validName = nameRegEx.test(String(nome));

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

    localStorage.removeItem('userToEdit');
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <section>
      <Header title="Cadastro de usuários" />
      <form>
        <input
          type="text"
          name="nome"
          value={nome}
          placeholder="Digite seu nome"
          onChange={handleChange}
          required
        />
        <MaskedInput
          name="cpf"
          mask="999.999.999-99"
          value={cpf}
          placeholder="Digite seu CPF"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Digite seu e-mail"
          onChange={handleChange}
          required
        />
        <MaskedInput
          name="telefone"
          mask="(99) 9 9999-9999"
          value={telefone}
          placeholder="Digite seu telefone"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!validEmail || !validName || cpf.length < 11 || telefone.length < 11}
          onClick={handleSubmit}
        >
          Enviar
        </button>
        <button
          type="submit"
          disabled={!validEmail || !validName || cpf.length < 11 || telefone.length < 11}
          onClick={() => handleUpdate(userToEdit.index, values)}
        >
          Atualizar
        </button>
      </form>
      <Link to="/directory">
        <button type="button">Ver usuários cadastrados</button>
      </Link>
    </section>
  );
}

export default Home;
