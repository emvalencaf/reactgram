

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message.component';


// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


// Redux

// styles
import './Auth.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {

    e.preventDefault();

  };


  return (
    <div id='login'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Faça o login para ver o que há de novo.</p>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="senha" 
        />
      </form>
      <p>Não tem uma conta? <Link to="/register">Clique aqui</Link></p>
    </div>
  )
}

export default Login