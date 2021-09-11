import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

import { Header, Card } from '../components';
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
        users?.map((user, index) => {
          return <Card user={user} handleDelete={handleDelete} index={index} />;
        })
      )}
      <Link to="/">
        <button onClick={() => removeLocalStorage('userToEdit')}>
          Cadastrar novo usuário
        </button>
      </Link>
    </section>
  );
}

export default Directory;
