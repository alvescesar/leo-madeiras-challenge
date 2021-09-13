import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from '../App.js';
import { noUser, editUser, userList } from '../mockData';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

describe('Website functionalities', () => {
  it('allows a new user to be registered', () => {
    renderWithRouter(<App />);

    const { nome, cpf, email, telefone } = userList[0];

    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    const cpfInput = screen.getByPlaceholderText(/Digite seu CPF/i);
    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const phoneInput = screen.getByPlaceholderText(/Digite seu telefone/i);

    // input de cpf e telefone só aceitam números
    userEvent.type(nameInput, nome);
    fireEvent.change(cpfInput, { target: { value: cpf } });
    userEvent.type(emailInput, email);
    fireEvent.change(phoneInput, { target: { value: telefone } });

    // valores finais com máscara
    expect(nameInput.value).toStrictEqual(nome);
    expect(cpfInput.value).toStrictEqual("123.456.789-00");
    expect(emailInput.value).toStrictEqual(email);
    expect(phoneInput.value).toStrictEqual('(54) 3231-3232');

    const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });
    const directoryBtn = screen.getByRole('button', { name: /Ver usuários cadastrados/i });

    expect(submitBtn).not.toBeDisabled();

    userEvent.click(submitBtn);
    userEvent.click(directoryBtn);

    const tableData = screen.getAllByRole('cell');

    expect(tableData).toHaveLength(5);
  });
});
