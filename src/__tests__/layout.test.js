import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from '../App.js';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

describe('Home page layout', () => {
  it('contains a header', () => {
    renderWithRouter(<App />);

    const header = screen.getByRole('heading');
    const logo = screen.getByAltText(/logomarca Amigo Leo/i);

    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('H1');
    expect(header.textContent).toMatch('Cadastro de usuários');
    expect(logo).toBeInTheDocument();
  });

  it('contains a form', () => {
    renderWithRouter(<App />);

    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    const cpfInput = screen.getByPlaceholderText(/Digite seu CPF/i);
    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const phoneInput = screen.getByPlaceholderText(/Digite seu telefone/i);

    expect(nameInput).toBeInTheDocument();
    expect(cpfInput.tagName).toBe('INPUT');
    expect(emailInput.className).toBe('form__input');
    expect(phoneInput.hasAttribute('mask'));
  });

  it('contains submit and navigation buttons', () => {
    renderWithRouter(<App />);

    const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });
    const directoryBtn = screen.getByRole('button', { name: /Ver usuários cadastrados/i });
    const link = screen.getByRole('link');

    expect(submitBtn).toBeDisabled();
    expect(directoryBtn).not.toBeDisabled();
    expect(directoryBtn.parentNode).toBe(link);
  });
});

describe('Directory page layout', () => {
  it('contains a new header title', () => {
    renderWithRouter(<App />);
    const directoryBtn = screen.getByRole('button', { name: /Ver usuários cadastrados/i });

    userEvent.click(directoryBtn);

    const header = screen.getByText(/Usuários cadastrados/i);

    expect(header).toBeInTheDocument();
  });

  it('has a notice if no users are registered', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/directory');

    const notice = screen.getByText(/Nenhum usuário cadastrado/i);

    expect(notice).toBeInTheDocument();
  });
});
