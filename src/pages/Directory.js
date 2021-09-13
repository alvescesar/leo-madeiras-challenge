import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

import { Header, TableData } from '../components';
import { saveLocalStorage, removeLocalStorage } from '../helper/localStorage';

function Directory() {
  const { users, setUsers } = useContext(Context);

  const handleDelete = (index) => {
    setUsers((arr) => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)]);
  };

  useEffect(() => {
    saveLocalStorage('users', users);
  }, [users]);

  return (
    <section>
      <Header title="Usuários cadastrados" />
      {!users.length ? (
        <p>Nenhum usuário cadastrado</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>CPF</th>
              <th>EMAIL</th>
              <th>TELEFONE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return <TableData user={user} handleDelete={handleDelete} index={index} />;
            })}
          </tbody>
        </table>
      )}
      <div className="flex-container">
        <Link to="/">
          <button
            type="button"
            className="btn btn--grey"
            onClick={() => removeLocalStorage('userToEdit')}
          >
            Cadastrar novo usuário
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Directory;
