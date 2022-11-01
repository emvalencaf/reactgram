// react
// react-router-dom
import { Link } from 'react-router-dom';


// Hooks
import { useState, useEffect } from 'react';

// Components


// styles
import './Auth.css';


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmpassword
    };

    console.log(user);

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
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder='E-mail'
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder='Senha'
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder='Confirme a senha'
          value={confirmpassword || ""}
          onChange={(e) => setConfirmpassword(e.target.value)}
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