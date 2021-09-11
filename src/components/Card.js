import React from 'react';
import { Link } from 'react-router-dom';

import { saveLocalStorage } from '../helper/localStorage';

function Card({ user, handleDelete, index }) {
  return (
    <section key={user.cpf}>
      <h3>{user.nome}</h3>
      <p>CPF: {user.cpf}</p>
      <p>E-mail: {user.email}</p>
      <p>Telefone: {user.telefone}</p>
      <Link to="/">
        <button
          type="button"
          onClick={() => saveLocalStorage('userToEdit', { index, user })}
        >
          Editar
        </button>
      </Link>
      <button type="button" onClick={() => handleDelete(index)}>
        Deletar
      </button>
    </section>
  );
}

export default Card;
