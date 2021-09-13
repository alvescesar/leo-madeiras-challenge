import React from 'react';
import { Link } from 'react-router-dom';

import { saveLocalStorage } from '../helper/localStorage';

function TableData({ user, handleDelete, index }) {
  return (
    <tr>
      <td>{user.nome}</td>
      <td>CPF: {user.cpf}</td>
      <td>E-mail: {user.email}</td>
      <td>Telefone: {user.telefone}</td>
      <td>
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
      </td>
    </tr>
  );
}

export default TableData;
