// react
// react-router-dom
import { Link } from 'react-router-dom';


// Hooks
import { useState, useEffect } from 'react';

// Components


// styles
import './Auth.css';


const Register = () => {


  const handleSubmit = (e) => {

    e.preventDefault();

  };


  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Nome"
        />
        <input
          type="email"
          name="email"
          placeholder='E-mail'
        />
        <input
          type="password"
          name="password"
          placeholder='Senha'
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder='Confirme a senha'
        />
        <button type='submit'>Cadastrar</button>
      </form>
      <p>
        Já tem conta? <Link
          to='/login'
        >Clique aqui</Link>
      </p>
    </div>
  )
}

export default Register