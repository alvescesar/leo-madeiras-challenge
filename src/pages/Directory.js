import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

import { Header, Card } from '../components';

function Directory() {
  const { users, setUsers } = useContext(Context);

  const handleDelete = (index) => {
    setUsers((arr) => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length - 1)]);
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
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
        <button>Cadastrar novo usuário</button>
      </Link>
    </section>
  );
}

export default Directory;
