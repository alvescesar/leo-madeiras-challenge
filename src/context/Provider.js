import React, { useState } from 'react';
import Context from './Context';

import { getLocalStorage } from '../helper/localStorage';

const initialValues = {
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
};

const userValues = getLocalStorage('users') || [];

function Provider({ children }) {
  const [values, setValues] = useState(initialValues);
  const [users, setUsers] = useState(userValues);

  const store = { values, setValues, users, setUsers };

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export default Provider;
